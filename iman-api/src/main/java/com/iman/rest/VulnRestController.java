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

import com.iman.model.util.Message;
import com.iman.model.vulnerability.VulnCreateDto;
import com.iman.model.vulnerability.VulnListDto;
import com.iman.model.vulnerability.VulnSearchDto;
import com.iman.model.vulnerability.VulnShowDto;
import com.iman.model.vulnerability.VulnUpdateDto;
import com.iman.service.vulns.VulnService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/security/vuln")
@Tag(name = "Vulnerability")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin
public class VulnRestController {
    
	@Autowired
	private VulnService vulnService;

	public VulnRestController(VulnService vulnService) {
		this.vulnService = vulnService;
	}
	
	@GetMapping(value = "/{vulnId}")
	public ResponseEntity<Object> getVulnIdById(@PathVariable Long vulnId) {
		try {
			VulnShowDto activeShowDto = vulnService.findVerifiedVulnShowById(vulnId);
			return new ResponseEntity<>(activeShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
    
    @GetMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> findVulns(@Valid VulnSearchDto vulnSearchDto,
			@PathVariable Long projectId, Pageable pageable) {
		try {
			Page<VulnListDto> activeShowDto = vulnService.findVulns(vulnSearchDto, projectId, pageable);
			return new ResponseEntity<>(activeShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
    
    @PostMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> createVuln(@RequestBody @Valid VulnCreateDto vulnCreateDto, @PathVariable Long projectId) {
		try {
			VulnShowDto vl = vulnService.createVuln(vulnCreateDto, projectId);
			return new ResponseEntity<>(vl, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/")
	public ResponseEntity<Object> updateVuln(@RequestBody @Valid VulnUpdateDto vulnUpdateDto) {
		try {
			VulnShowDto vl = vulnService.updateVuln(vulnUpdateDto);
			return new ResponseEntity<>(vl, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping(value = "/{vulnId}")
	public ResponseEntity<Object> disableVuln(@PathVariable Long vulnId) {
		try {
			vulnService.disableVuln(vulnId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	
}
