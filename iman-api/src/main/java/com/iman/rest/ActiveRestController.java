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

import com.iman.model.actives.ActiveCreateDto;
import com.iman.model.actives.ActiveListDto;
import com.iman.model.actives.ActiveSearchDto;
import com.iman.model.actives.ActiveShowDto;
import com.iman.model.actives.ActiveUpdateDto;
import com.iman.model.util.Message;
import com.iman.service.actives.ActiveService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/security/actives")
@Tag(name = "Actives")
@SecurityRequirement(name = "Bearer Authentication")
@CrossOrigin
public class ActiveRestController {

	@Autowired
	private ActiveService activeService;

	public ActiveRestController(ActiveService activeService) {
		this.activeService = activeService;
	}

	@GetMapping(value = "/{activeId}")
	public ResponseEntity<Object> getActiveById(@PathVariable Long activeId) {
		try {

			ActiveShowDto activeShowDto = activeService.findVerifiedActiveShowById(activeId);
			return new ResponseEntity<>(activeShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@GetMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> getIncidentsByProject(@Valid ActiveSearchDto activeSearch,
			@PathVariable Long projectId, Pageable pageable) {
		try {
			Page<ActiveListDto> activeListDto = activeService.findActives(activeSearch, projectId, pageable);
			return new ResponseEntity<>(activeListDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PostMapping(value = "/")
	public ResponseEntity<Object> createActive(@RequestBody @Valid ActiveCreateDto activeCreateDto) {
		try {
			ActiveShowDto a = activeService.createActive(activeCreateDto);
			return new ResponseEntity<>(a, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/")
	public ResponseEntity<Object> updateActive(@RequestBody @Valid ActiveUpdateDto activeUpdateDto) {
		try {
			ActiveShowDto a = activeService.updateActive(activeUpdateDto);
			return new ResponseEntity<>(a, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping(value = "/{activeId}")
	public ResponseEntity<Object> disableActive(@PathVariable Long activeId) {
		try {
			activeService.disableActive(activeId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

}
