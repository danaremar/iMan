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

import com.iman.model.risk.dimension.RiskDimensionCreateDto;
import com.iman.model.risk.dimension.RiskDimensionShowDto;
import com.iman.model.risk.dimension.RiskDimensionUpdateDto;
import com.iman.model.util.Message;
import com.iman.service.risks.RiskDimensionService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/security/risks/dimension")
@Tag(name = "Risk dimension")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin
public class RiskDimensionRestController {
	
	@Autowired
	private RiskDimensionService riskDimensionService;

	public RiskDimensionRestController(RiskDimensionService riskDimensionService) {
		this.riskDimensionService = riskDimensionService;
	}
	
	@GetMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> getRiskDimensionByProjectId(@PathVariable Long projectId) {
		try {

			List<RiskDimensionShowDto> riskShowDto = riskDimensionService.findAllRiskDimensionByProjectId(projectId);
			return new ResponseEntity<>(riskShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PostMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> createRiskDimension(@RequestBody @Valid RiskDimensionCreateDto riskDimensionCreateDto, @PathVariable Long projectId) {
		try {
			RiskDimensionShowDto a = riskDimensionService.createRiskDimension(projectId, riskDimensionCreateDto);
			return new ResponseEntity<>(a, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/")
	public ResponseEntity<Object> updateRiskDimension(@RequestBody @Valid RiskDimensionUpdateDto riskDimensionUpdateDto) {
		try {
			RiskDimensionShowDto a = riskDimensionService.updateRiskDimension(riskDimensionUpdateDto);
			return new ResponseEntity<>(a, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping(value = "/{riskId}")
	public ResponseEntity<Object> disableRiskDimension(@PathVariable Long riskDimensionId) {
		try {
			riskDimensionService.deleteRiskDimensionById(riskDimensionId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

}
