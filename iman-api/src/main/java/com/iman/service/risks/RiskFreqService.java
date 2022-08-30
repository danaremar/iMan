package com.iman.service.risks;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.model.projects.Project;
import com.iman.model.risk.freq.RiskFreq;
import com.iman.model.risk.freq.RiskFreqCreateDto;
import com.iman.model.risk.freq.RiskFreqShowDto;
import com.iman.model.risk.freq.RiskFreqUpdateDto;
import com.iman.repository.risk.RiskFreqRepository;
import com.iman.service.projects.ProjectService;

@Service
public class RiskFreqService {

	@Autowired
	private RiskFreqRepository riskFreqRepository;

	@Autowired
	private ProjectService projectService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	/*
	 * FIND BY ID
	 * 
	 */
	public RiskFreq findById(Long id) {
		return riskFreqRepository.findById(id).orElseThrow();
	}

	/*
	 * SHOW ALL BY PROJECT
	 * 
	 */
	public RiskFreqShowDto findRiskFreqByProjectId(Long projectId) {

		// Permissions
		Project project = projectService.findProjectById(projectId);
		projectService.verifyUserRelatedWithProject(project);

		RiskFreq exampleRiskFreq = new RiskFreq();
		exampleRiskFreq.setProject(project);
		Example<RiskFreq> example = Example.of(exampleRiskFreq);
		RiskFreq riskFreq = riskFreqRepository.findOne(example).orElseThrow();
		return modelMapper.map(riskFreq, RiskFreqShowDto.class);
	}

	/*
	 * CREATE
	 * 
	 */
	@Transactional
	public RiskFreqShowDto createRiskFreq(Long projectId, RiskFreqCreateDto riskFreqCreate) {

		// Permissions
		Project project = projectService.findProjectById(projectId);
		projectService.verifyUserRelatedWithProject(project);

		// Creation
		RiskFreq riskFreq = modelMapper.map(riskFreqCreate, RiskFreq.class);
		riskFreq.setProject(project);

		// Save
		RiskFreq a = riskFreqRepository.save(riskFreq);
		return modelMapper.map(a, RiskFreqShowDto.class);
	}

	/*
	 * UPDATE
	 * 
	 */
	@Transactional
	public RiskFreqShowDto updateRiskFreq(RiskFreqUpdateDto riskFreqUpdateDto) {

		// Get previous riskFreq
		RiskFreq oldRiskFreq = findById(riskFreqUpdateDto.getId());

		// Permissions
		projectService.verifyUserRelatedWithProject(oldRiskFreq.getProject());

		// Creation
		RiskFreq newRiskFreq = modelMapper.map(riskFreqUpdateDto, RiskFreq.class);
		newRiskFreq.setProject(oldRiskFreq.getProject());

		// Save
		RiskFreq a = riskFreqRepository.save(newRiskFreq);
		return modelMapper.map(a, RiskFreqShowDto.class);
	}

	/*
	 * DELETE
	 * 
	 */
	@Transactional
	public void deleteRiskFreqById(Long riskFreqId) {

		// Get riskFreq
		RiskFreq riskFreq = findById(riskFreqId);

		// Permissions
		projectService.verifyOwnerOrAdmin(riskFreq.getProject());

		// Delete
		riskFreqRepository.deleteById(riskFreqId);
	}

}
