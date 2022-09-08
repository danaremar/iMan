package com.iman.service.risks;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;

import com.iman.config.ImanMessages;
import com.iman.model.actives.Active;
import com.iman.model.projects.Project;
import com.iman.model.risk.calc.RiskCalc;
import com.iman.model.risk.calc.RiskCalcUpdateDto;
import com.iman.model.risk.dimension.RiskDimension;
import com.iman.model.risk.freq.RiskFreq;
import com.iman.model.risk.risk.Risk;
import com.iman.model.risk.risk.RiskCreateDto;
import com.iman.model.risk.risk.RiskListDto;
import com.iman.model.risk.risk.RiskSearchDto;
import com.iman.model.risk.risk.RiskShowDto;
import com.iman.model.risk.risk.RiskUpdateDto;
import com.iman.model.risk.sfg.RiskSfg;
import com.iman.model.risk.sfg.RiskSfgUpdateDto;
import com.iman.model.risk.sfgred.RiskSfgReduction;
import com.iman.model.risk.sfgred.RiskSfgReductionUpdateDto;
import com.iman.model.users.User;
import com.iman.model.vulnerability.vuln.Vuln;
import com.iman.repository.risk.RiskRepository;
import com.iman.service.actives.ActiveService;
import com.iman.service.projects.ProjectService;
import com.iman.service.users.UserService;
import com.iman.service.vulns.VulnService;

@Service
public class RiskService {

	@Autowired
	RiskRepository riskRepository;

	@Autowired
	RiskDimensionService riskDimensionService;

	@Autowired
	RiskFreqService riskFreqService;

	@Autowired
	VulnService vulnService;

	@Autowired
	ActiveService activeService;

	@Autowired
	ProjectService projectService;

	@Autowired
	UserService userService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	/*
	 * AUX
	 * 
	 */

	RiskListDto mapRiskToList(Risk r) {
		return modelMapper.map(r, RiskListDto.class);
	}

	Page<RiskListDto> mapPagetoPageDto(Page<Risk> r) {
		return r.map(this::mapRiskToList);
	}

	Risk findRiskById(Long id) {
		Risk exampleRisk = new Risk();
		exampleRisk.setId(id);
		exampleRisk.setActive(true);
		Example<Risk> example = Example.of(exampleRisk);
		return riskRepository.findOne(example).orElseThrow();
	}

	Long countVulnsInProject(Project project) {
		Risk exampleRisk = new Risk();
		exampleRisk.setProject(project);
		Example<Risk> example = Example.of(exampleRisk);
		return riskRepository.count(example);
	}

	/*
	 * FIND BY FILTER, SORTING & PAGING
	 * 
	 */
	public Page<RiskListDto> findRisks(RiskSearchDto riskSearchDto, Long projectId, Pageable pageable) {

		// Permisisions
		Project project = projectService.findProjectById(projectId);
		projectService.verifyUserRelatedWithProject(project);

		// Matcher & example
		Risk risk = modelMapper.map(riskSearchDto, Risk.class);
		if (!StringUtils.isEmpty(riskSearchDto.getCreatedBy())) {
			User user = new User();
			user.setUsername(riskSearchDto.getCreatedBy());
			risk.setCreatedBy(user);
		}
		if (!StringUtils.isEmpty(riskSearchDto.getModifiedBy())) {
			User user = new User();
			user.setUsername(riskSearchDto.getModifiedBy());
			risk.setModifiedBy(user);
		}
		risk.setProject(project);
		risk.setActive(true);

		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase()
				.withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
		Example<Risk> example = Example.of(risk, matcher);

		// Find
		Page<Risk> riskPage = riskRepository.findAll(example, pageable);
		return mapPagetoPageDto(riskPage);
	}

	/*
	 * SHOW
	 * 
	 */

	Risk findVerifiedRiskById(Long riskId) {
		Risk risk = findRiskById(riskId);
		projectService.verifyUserRelatedWithProject(risk.getProject());
		return risk;
	}

	public RiskShowDto findVerifiedRiskShowById(Long riskId) {
		Risk risk = findVerifiedRiskById(riskId);
		return modelMapper.map(risk, RiskShowDto.class);
	}

	/*
	 * CREATE
	 * 
	 */
	RiskCalc getRiskCalc(RiskCalcUpdateDto riskCalcUpdateDto, Map<Long, Double> sfgReductionMap,
			Map<Long, Double> sfgCostMap, Project project) {
		
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		RiskCalc riskCalc = modelMapper.map(riskCalcUpdateDto, RiskCalc.class);

		// TODO: verify permissions: now only create, not update
		riskCalc.setId(null);

		// DIMENSION
		RiskDimension riskDimension = riskDimensionService.findById(riskCalcUpdateDto.getRiskDimensionId());
		if (!riskDimension.getProject().getId().equals(project.getId())) {
			throw new AccessDeniedException(ImanMessages.USER_NOT_ALLOWED);
		}
		riskCalc.setRiskDimension(riskDimension);

		// FREQ
		RiskFreq riskFreq = riskFreqService.findById(riskCalcUpdateDto.getRiskFreqId());
		if (!riskFreq.getProject().getId().equals(project.getId())) {
			throw new AccessDeniedException(ImanMessages.USER_NOT_ALLOWED);
		}
		riskCalc.setRiskFreq(riskFreq);

		// TOTAL WITHOUT SAFEGUARDS
		Double totalWoSfg = riskCalcUpdateDto.getValue() * riskCalcUpdateDto.getDegradation() * riskFreq.getQuantity();
		riskCalc.setTotalWoSfg(totalWoSfg);

		// TOTAL
		Double total = totalWoSfg;
		if(sfgReductionMap.size()!=0 || sfgCostMap.size()!=0){
			total = totalWoSfg * Math.pow(1.0 - sfgReductionMap.get(riskCalcUpdateDto.getRiskDimensionId()), 2)
			- sfgCostMap.get(riskCalcUpdateDto.getRiskDimensionId());
		}
		riskCalc.setTotal(total);

		return riskCalc;
	}

	List<RiskCalc> getRiskCalcLs(List<RiskCalcUpdateDto> riskCalcUpdateDtoLs, List<RiskSfgUpdateDto> riskSfgUpdateDtoLs,
			Project project) {
		if (riskCalcUpdateDtoLs != null && !riskCalcUpdateDtoLs.isEmpty() && riskSfgUpdateDtoLs != null && !riskSfgUpdateDtoLs.isEmpty()) {

			Map<Long, Double> sfgReductionMap = riskSfgUpdateDtoLs.stream()
					.filter(RiskSfgUpdateDto::getActive)
					.flatMap(x -> x.getRiskSfgReduction().stream())
					.collect(Collectors.groupingBy(RiskSfgReductionUpdateDto::getRiskDimensionId,
							Collectors.summingDouble(RiskSfgReductionUpdateDto::getReduction)));

			Map<Long, Double> sfgCostMap = riskSfgUpdateDtoLs.stream()
					.filter(RiskSfgUpdateDto::getActive)
					.flatMap(x -> x.getRiskSfgReduction().stream())
					.collect(Collectors.groupingBy(RiskSfgReductionUpdateDto::getRiskDimensionId,
							Collectors.summingDouble(RiskSfgReductionUpdateDto::getCost)));

			return riskCalcUpdateDtoLs.parallelStream().map(x -> getRiskCalc(x, sfgReductionMap, sfgCostMap, project))
					.collect(Collectors.toList());
		} else {
			return new ArrayList<>();
		}
	}

	RiskSfgReduction getRiskSfgReduction(RiskSfgReductionUpdateDto riskSfgReductionUpdateDto, Project project) {
		RiskSfgReduction r = modelMapper.map(riskSfgReductionUpdateDto, RiskSfgReduction.class);
		RiskDimension riskDimension = riskDimensionService.findById(riskSfgReductionUpdateDto.getRiskDimensionId());
		if (!riskDimension.getProject().getId().equals(project.getId())) {
			throw new AccessDeniedException(ImanMessages.USER_NOT_ALLOWED);
		}
		
		// set parameters
		r.setId(null);
		r.setRiskDimension(riskDimension);
		if(r.getReduction()==null) {
			r.setReduction(0.0);
		}
		if(r.getCost()==null) {
			r.setCost(0.0);
		}
		
		return r;
	}

	RiskSfg getRiskSfg(RiskSfgUpdateDto riskSfgUpdateDto, Project project) {

		// map to RiskSfg
		RiskSfg s = modelMapper.map(riskSfgUpdateDto, RiskSfg.class);

		// TODO: verify permissions: now only create, not update
		s.setId(null);

		// set riskSfgReduction & return
		List<RiskSfgReduction> ls = riskSfgUpdateDto.getRiskSfgReduction().stream()
				.map(x -> getRiskSfgReduction(x, project)).collect(Collectors.toList());
		s.setRiskSfgReduction(ls);
		return s;
	}

	List<RiskSfg> getRiskSfgLs(List<RiskSfgUpdateDto> riskSfgUpdateDtoLs, Project project) {
		if (riskSfgUpdateDtoLs != null && !riskSfgUpdateDtoLs.isEmpty()) {
			return riskSfgUpdateDtoLs.parallelStream().map(x -> getRiskSfg(x, project)).collect(Collectors.toList());
		} else {
			return new ArrayList<>();
		}
		
	}

	Double getRiskTotalWoSfg(List<RiskCalc> riskCalc) {
		if (riskCalc != null && !riskCalc.isEmpty()) {
			return riskCalc.parallelStream().collect(Collectors.summingDouble(RiskCalc::getTotalWoSfg));
		} else {
			return 0.;
		}
	}

	Double getRiskTotal(List<RiskCalc> riskCalc) {
		if (riskCalc != null && !riskCalc.isEmpty()) {
			return riskCalc.parallelStream().collect(Collectors.summingDouble(RiskCalc::getTotal));
		} else {
			return 0.;
		}

	}

	public RiskShowDto createRisk(RiskCreateDto riskCreateDto, Long projectId) {

		// Permissions
		Project project = projectService.findProjectById(projectId);
		projectService.verifyOwnerOrAdmin(project);
		
		// ---> riskSfg List<RiskSfgUpdateDto>
		List<RiskSfg> riskSfgLs = getRiskSfgLs(riskCreateDto.getRiskSfg(), project);
				
		// ---> riskCalc List<RiskCalcUpdateDto>
		List<RiskCalc> riskCalcLs = getRiskCalcLs(riskCreateDto.getRiskCalc(), riskCreateDto.getRiskSfg(), project);
		
		riskCreateDto.setRiskSfg(null);
		riskCreateDto.setRiskCalc(null);

		// Properties not allowed to map
		Vuln vuln = vulnService.findVerifiedVulnById(riskCreateDto.getVulnId());
		Active active = activeService.findVerifiedActiveById(riskCreateDto.getActiveId());
		
		// Creation
		Risk risk = modelMapper.map(riskCreateDto, Risk.class);
		risk.setId(null);
		risk.setCode(countVulnsInProject(project) + 1);
		risk.setActive(true);
		risk.setCreationDate(new Date());
		risk.setCreatedBy(userService.getCurrentUser());
		risk.setLastModification(new Date());
		risk.setModifiedBy(userService.getCurrentUser());
		risk.setProject(project);
		risk.setRiskCalc(riskCalcLs);
		risk.setRiskSfg(riskSfgLs);
		risk.setTotalWoSfg(getRiskTotalWoSfg(riskCalcLs));
		risk.setTotal(getRiskTotal(riskCalcLs));
		risk.setAssignedVuln(vuln);
		risk.setAssignedActive(active);

		// Save
		Risk r = riskRepository.save(risk);
		return modelMapper.map(r, RiskShowDto.class);
	}

	/*
	 * UPDATE
	 * 
	 */
	public RiskShowDto updateRisk(RiskUpdateDto riskUpdateDto) {

		// Get previous risk
		Risk oldRisk = findRiskById(riskUpdateDto.getId());

		// Permissions
		Project project = oldRisk.getProject();
		projectService.verifyOwnerOrAdmin(project);

		// ---> riskSfg List<RiskSfgUpdateDto>
		List<RiskSfg> riskSfgLs = getRiskSfgLs(riskUpdateDto.getRiskSfg(), project);

		// ---> riskCalc List<RiskCalcUpdateDto>
		List<RiskCalc> riskCalcLs = getRiskCalcLs(riskUpdateDto.getRiskCalc(), riskUpdateDto.getRiskSfg(), project);
		
		riskUpdateDto.setRiskCalc(null);
		riskUpdateDto.setRiskSfg(null);
		
		// Properties not allowed to map
		Vuln vuln = vulnService.findVerifiedVulnById(riskUpdateDto.getVulnId());
		Active active = activeService.findVerifiedActiveById(riskUpdateDto.getActiveId());

		// Update & fetch from previous
		Risk newRisk = modelMapper.map(riskUpdateDto, Risk.class);
		newRisk.setId(riskUpdateDto.getId());
		newRisk.setCode(oldRisk.getCode());
		newRisk.setActive(true);
		newRisk.setCreationDate(oldRisk.getCreationDate());
		newRisk.setCreatedBy(oldRisk.getCreatedBy());
		newRisk.setLastModification(new Date());
		newRisk.setModifiedBy(userService.getCurrentUser());
		newRisk.setProject(project);
		newRisk.setRiskCalc(riskCalcLs);
		newRisk.setRiskSfg(riskSfgLs);
		newRisk.setTotalWoSfg(getRiskTotalWoSfg(riskCalcLs));
		newRisk.setTotal(getRiskTotal(riskCalcLs));
		newRisk.setAssignedVuln(vuln);
		newRisk.setAssignedActive(active);

		// Save
		Risk r = riskRepository.save(newRisk);
		return modelMapper.map(r, RiskShowDto.class);
	}

	/*
	 * DISABLE -> Set no active
	 * 
	 */

	public void disableRisk(Long riskId) {

		// Get previous risk
		Risk r = findRiskById(riskId);

		// Permissions
		projectService.verifyOwnerOrAdmin(r.getProject());

		// Update
		r.setActive(false);
		r.setLastModification(new Date());
		r.setModifiedBy(userService.getCurrentUser());

		// Save
		riskRepository.save(r);
	}

}
