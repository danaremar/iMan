package com.iman.service.risks;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.iman.repository.risk.RiskRepository;
import com.iman.service.projects.ProjectService;
import com.iman.service.users.UserService;

@Service
public class RiskService {
	
	@Autowired
	private RiskRepository riskRepository;
	
	@Autowired
	private RiskDimensionService riskDimensionService;
	
	@Autowired
	private RiskFreqService riskFreqService;
	
	@Autowired
	private ProjectService projectService;

	@Autowired
	private UserService userService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;
	
	
	/*
	 * AUX
	 * 
	 */
	
	
	/*
	 * FIND BY FILTER, SORTING & PAGING
	 * 
	 */
	
	
	/*
	 * SHOW
	 * 
	 */
	
	
	/*
	 * CREATE
	 * 
	 */
	
	
	/*
	 * UPDATE
	 * 
	 */

	
	/*
	 * DISABLE -> Set no active
	 * 
	 */
	
	
}
