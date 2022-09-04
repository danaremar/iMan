package com.iman.rest;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iman.model.risk.freq.RiskFreqCreateDto;
import com.iman.model.risk.freq.RiskFreqShowDto;
import com.iman.model.risk.freq.RiskFreqUpdateDto;
import com.iman.model.util.Message;
import com.iman.service.risks.RiskFreqService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/security/risks/freq")
@Tag(name = "Risk frecuency")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin
public class RiskFreqRestController {
	
	@Autowired
	private RiskFreqService riskFreqService;

	public RiskFreqRestController(RiskFreqService riskFreqService) {
		this.riskFreqService = riskFreqService;
	}
	
	@GetMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> getRiskFreqByProjectId(@PathVariable Long projectId) {
		try {

			List<RiskFreqShowDto> riskShowDto = riskFreqService.findAllRiskFreqByProjectId(projectId);
			return new ResponseEntity<>(riskShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PostMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> createRiskFreq(@RequestBody @Valid RiskFreqCreateDto riskFreqCreateDto, @PathVariable Long projectId) {
		try {
			RiskFreqShowDto a = riskFreqService.createRiskFreq(projectId, riskFreqCreateDto);
			return new ResponseEntity<>(a, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/")
	public ResponseEntity<Object> updateRiskFreq(@RequestBody @Valid RiskFreqUpdateDto riskFreqUpdateDto) {
		try {
			RiskFreqShowDto a = riskFreqService.updateRiskFreq(riskFreqUpdateDto);
			return new ResponseEntity<>(a, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping(value = "/all/project/{projectId}")
	public ResponseEntity<Object> saveAllRiskFreq(@RequestBody @Valid List<RiskFreqUpdateDto> riskFreqUpdateDtoLs, @PathVariable Long projectId) {
		try {
			List<RiskFreqShowDto> a = riskFreqService.saveAllRiskFreq(projectId, riskFreqUpdateDtoLs);
			return new ResponseEntity<>(a, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping(value = "/{riskId}")
	public ResponseEntity<Object> disableRiskFreq(@PathVariable Long riskFreqId) {
		try {
			riskFreqService.deleteRiskFreqById(riskFreqId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	

}
