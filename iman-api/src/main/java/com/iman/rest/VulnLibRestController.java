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
import com.iman.model.vulnerability.VulnLibCreateDto;
import com.iman.model.vulnerability.VulnLibListDto;
import com.iman.model.vulnerability.VulnLibSearchDto;
import com.iman.model.vulnerability.VulnLibShowDto;
import com.iman.model.vulnerability.VulnLibUpdateDto;
import com.iman.service.vulns.VulnLibService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/security/vulnlib")
@Tag(name = "Vulnerability Library")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin
public class VulnLibRestController {
    
    @Autowired
    private VulnLibService vulnLibService;

    public VulnLibRestController(VulnLibService vulnLibService) {
        this.vulnLibService = vulnLibService;
    }
    
    @GetMapping(value = "/{vulnLibId}")
	public ResponseEntity<Object> getVulnLibIdById(@PathVariable Long vulnLibId) {
		try {

			VulnLibShowDto activeShowDto = vulnLibService.findVerifiedVulnLibShowById(vulnLibId);
			return new ResponseEntity<>(activeShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
    
    @GetMapping(value = "/")
	public ResponseEntity<Object> findStandardVulnLib(@Valid VulnLibSearchDto vulnLibSearchDto,
			@PathVariable Long projectId, Pageable pageable) {
		try {
			Page<VulnLibListDto> activeShowDto = vulnLibService.findStandardVulnLib(vulnLibSearchDto, pageable);
			return new ResponseEntity<>(activeShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
    
    @GetMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> findVulnLib(@Valid VulnLibSearchDto vulnLibSearchDto,
			@PathVariable Long projectId, Pageable pageable) {
		try {
			Page<VulnLibListDto> activeShowDto = vulnLibService.findVulnLib(vulnLibSearchDto, projectId, pageable);
			return new ResponseEntity<>(activeShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
    
    @PostMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> createVulnLib(@RequestBody @Valid VulnLibCreateDto vulnLibCreateDto, @PathVariable Long projectId) {
		try {
			VulnLibShowDto vl = vulnLibService.createVulnLib(vulnLibCreateDto, projectId);
			return new ResponseEntity<>(vl, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/")
	public ResponseEntity<Object> updateVulnLib(@RequestBody @Valid VulnLibUpdateDto vulnLibUpdateDto) {
		try {
			VulnLibShowDto vl = vulnLibService.updateVulnLib(vulnLibUpdateDto);
			return new ResponseEntity<>(vl, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping(value = "/{vulnLibId}")
	public ResponseEntity<Object> disableVulnLib(@PathVariable Long vulnLibId) {
		try {
			vulnLibService.disableVulnLib(vulnLibId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
    
    

    


}
