package com.iman.service.risks;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.model.projects.Project;
import com.iman.model.risk.dimension.RiskDimension;
import com.iman.model.risk.dimension.RiskDimensionCreateDto;
import com.iman.model.risk.dimension.RiskDimensionShowDto;
import com.iman.model.risk.dimension.RiskDimensionUpdateDto;
import com.iman.repository.risk.RiskDimensionRepository;
import com.iman.service.projects.ProjectService;

@Service
public class RiskDimensionService {

	@Autowired
	private RiskDimensionRepository riskDimensionRepository;

	@Autowired
	private ProjectService projectService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	/*
	 * AUX
	 * 
	 */
	public RiskDimension findById(Long id) {
		return riskDimensionRepository.findById(id).orElseThrow();
	}

	/*
	 * SHOW ALL BY PROJECT
	 * 
	 */
	public List<RiskDimensionShowDto> findAllRiskDimensionByProjectId(Long projectId) {
		// Permissions
		Project project = projectService.findProjectById(projectId);
		projectService.verifyUserRelatedWithProject(project);

		RiskDimension exampleRiskDimension = new RiskDimension();
		exampleRiskDimension.setProject(project);
		Example<RiskDimension> example = Example.of(exampleRiskDimension);
		List<RiskDimension> riskDimensionLs = riskDimensionRepository.findAll(example);
		return riskDimensionLs.parallelStream().map(x -> modelMapper.map(x, RiskDimensionShowDto.class))
				.collect(Collectors.toList());
	}

	/*
	 * CREATE
	 * 
	 */
	@Transactional
	public RiskDimensionShowDto createRiskDimension(Long projectId, RiskDimensionCreateDto riskDimensionCreate) {

		// Permissions
		Project project = projectService.findProjectById(projectId);
		projectService.verifyUserRelatedWithProject(project);

		// Creation
		RiskDimension riskDimension = modelMapper.map(riskDimensionCreate, RiskDimension.class);
		riskDimension.setProject(project);

		// Save
		RiskDimension a = riskDimensionRepository.save(riskDimension);
		return modelMapper.map(a, RiskDimensionShowDto.class);
	}

	/*
	 * UPDATE
	 * 
	 */
	@Transactional
	public RiskDimensionShowDto updateRiskDimension(RiskDimensionUpdateDto riskDimensionUpdateDto) {

		// Get previous riskDimension
		RiskDimension oldRiskDimension = findById(riskDimensionUpdateDto.getId());

		// Permissions
		projectService.verifyUserRelatedWithProject(oldRiskDimension.getProject());

		// Creation
		RiskDimension newRiskDimension = modelMapper.map(riskDimensionUpdateDto, RiskDimension.class);
		newRiskDimension.setProject(oldRiskDimension.getProject());

		// Save
		RiskDimension a = riskDimensionRepository.save(newRiskDimension);
		return modelMapper.map(a, RiskDimensionShowDto.class);
	}
	
	/*
	 * SAVE ALL
	 * 
	 */
	@Transactional
	public List<RiskDimensionShowDto> saveAllRiskDimension(Long projectId, List<RiskDimensionUpdateDto> riskDimensionUpdateDto) {
		return riskDimensionUpdateDto.stream()
			.map(x -> x.getId()!=null?updateRiskDimension(x):createRiskDimension(projectId, modelMapper.map(x, RiskDimensionCreateDto.class)))
			.collect(Collectors.toList());
	}

	/*
	 * DELETE
	 * 
	 */
	@Transactional
	public void deleteRiskDimensionById(Long riskDimensionId) {

		// Get riskDimension
		RiskDimension riskDimension = findById(riskDimensionId);

		// Permissions
		projectService.verifyOwnerOrAdmin(riskDimension.getProject());

		// Delete
		riskDimensionRepository.deleteById(riskDimensionId);
	}

}
