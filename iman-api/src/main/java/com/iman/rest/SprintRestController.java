package com.iman.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iman.model.sprints.Sprint;
import com.iman.model.sprints.SprintCreateDto;
import com.iman.model.sprints.SprintShowDto;
import com.iman.model.sprints.SprintUpdateDto;
import com.iman.model.util.Message;
import com.iman.service.sprints.SprintService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/sprint")
@Tag(name = "Sprint")
@SecurityRequirement(name = "Bearer Authentication")
public class SprintRestController {

	@Autowired
	SprintService sprintService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	public SprintRestController(SprintService sprintService, ModelMapper modelMapper) {
		this.sprintService = sprintService;
		this.modelMapper = modelMapper;
	}

	@GetMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> getAllSprintsByProjectId(@PathVariable Long projectId) {
		try {
			List<Sprint> sprints = sprintService.findSprintsByProjectId(projectId);
			List<SprintShowDto> sprintShowList = sprints.stream().map(x -> modelMapper.map(x, SprintShowDto.class))
					.collect(Collectors.toList());
			return new ResponseEntity<>(sprintShowList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}

	}

	@PostMapping
	public ResponseEntity<Object> createSprint(@RequestBody @Valid SprintCreateDto sprintCreateDto) {
		try {
			sprintService.createSprint(sprintCreateDto);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping
	public ResponseEntity<Object> updateSprint(@RequestBody @Valid SprintUpdateDto sprintUpdateDto) {
		try {
			sprintService.updateSprint(sprintUpdateDto);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping(value = "/{sprintId}/start")
	public ResponseEntity<Object> startSprint(@PathVariable Long sprintId) {
		try {
			sprintService.startSprint(sprintId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping(value = "/{sprintId}/close")
	public ResponseEntity<Object> closeSprint(@PathVariable Long sprintId) {
		try {
			sprintService.closeSprint(sprintId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping(value = "/{sprintId}/disable")
	public ResponseEntity<Object> disableSprint(@PathVariable Long sprintId) {
		try {
			sprintService.disableSprint(sprintId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@DeleteMapping(value = "/{sprintId}")
	public ResponseEntity<Object> deleteSprint(@PathVariable Long sprintId) {
		try {
			sprintService.deleteSprint(sprintId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

}
