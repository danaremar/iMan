package com.iman.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iman.model.reports.effort.EffortReport;
import com.iman.model.util.Message;
import com.iman.service.reports.ReportEffortService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/reports")
@Tag(name = "Reports")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin
public class ReportRestController {
	
	@Autowired
	ReportEffortService reportEffortService;

	public ReportRestController(ReportEffortService reportEffortService) {
		this.reportEffortService = reportEffortService;
	}
	
	@GetMapping(value = "/effort/{sprintId}")
	public ResponseEntity<Object> getTaskTimeBySprintId(@PathVariable Long sprintId) {
		try {
			EffortReport map = reportEffortService.getEffortReportBySprintId(sprintId);
			return new ResponseEntity<>(map, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	

}
