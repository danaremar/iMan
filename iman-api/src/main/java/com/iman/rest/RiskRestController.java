package com.iman.rest;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.iman.model.risk.risk.RiskCreateDto;
import com.iman.model.risk.risk.RiskListDto;
import com.iman.model.risk.risk.RiskSearchDto;
import com.iman.model.risk.risk.RiskShowDto;
import com.iman.model.risk.risk.RiskUpdateDto;
import com.iman.model.util.Message;
import com.iman.service.risks.RiskService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/security/risks")
@Tag(name = "Risks")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin
public class RiskRestController {
	
	@Autowired
	private RiskService riskService;

	public RiskRestController(RiskService riskService) {
		this.riskService = riskService;
	}
	
	@GetMapping(value = "/{riskId}")
	public ResponseEntity<Object> getRiskById(@PathVariable Long riskId) {
		try {

			RiskShowDto riskShowDto = riskService.findVerifiedRiskShowById(riskId);
			return new ResponseEntity<>(riskShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@GetMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> getRisksByProject(@Valid RiskSearchDto riskSearch,
			@PathVariable Long projectId, Pageable pageable) {
		try {
			Page<RiskListDto> riskListDto = riskService.findRisks(riskSearch, projectId, pageable);
			return new ResponseEntity<>(riskListDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PostMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> createRisk(@RequestBody @Valid RiskCreateDto riskCreateDto, @PathVariable Long projectId) {
		try {
			RiskShowDto a = riskService.createRisk(riskCreateDto, projectId);
			return new ResponseEntity<>(a, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/")
	public ResponseEntity<Object> updateRisk(@RequestBody @Valid RiskUpdateDto riskUpdateDto) {
		try {
			RiskShowDto a = riskService.updateRisk(riskUpdateDto);
			return new ResponseEntity<>(a, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping(value = "/{riskId}")
	public ResponseEntity<Object> disableRisk(@PathVariable Long riskId) {
		try {
			riskService.disableRisk(riskId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	
	
	

}
