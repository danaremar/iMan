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

import com.iman.model.effort.EffortShowDto;
import com.iman.model.effort.EffortStartDto;
import com.iman.model.effort.EffortUpdateDto;
import com.iman.model.util.Message;
import com.iman.service.effort.EffortService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/effort")
@Api(tags = "Effort")
@CrossOrigin
public class EffortRestController {

	@Autowired
	EffortService effortService;


	public EffortRestController(EffortService effortService) {
		this.effortService = effortService;
	}

	@GetMapping
	public ResponseEntity<Object> getAllMyEfforts() {
		try {
			List<EffortShowDto> efforts = effortService.getAllMyEfforts();
			return new ResponseEntity<>(efforts, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@GetMapping(value = "/task/{taskId}")
	public ResponseEntity<Object> getAllEffortsByTaskId(@PathVariable Long taskId) {
		try {
			List<EffortShowDto> efforts = effortService.getAllEffortsByTaskId(taskId);
			return new ResponseEntity<>(efforts, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@GetMapping(value = "/active")
	public ResponseEntity<Object> getActiveEffort() {
		try {
			EffortShowDto effort = effortService.findMyStartedEffortDto();
			if (effort != null) {
				return new ResponseEntity<>(effort, HttpStatus.OK);
			} else {
				return new ResponseEntity<>(null, HttpStatus.OK);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PostMapping
	public ResponseEntity<Object> startEffort(@RequestBody @Valid EffortStartDto effortStartDto) {
		try {
			effortService.startEffort(effortStartDto);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping
	public ResponseEntity<Object> updateEffort(@RequestBody @Valid EffortUpdateDto effortUpdateDto) {
		try {
			effortService.updateEffort(effortUpdateDto);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/{effortId}/end")
	public ResponseEntity<Object> endEffort(@PathVariable Long effortId) {
		try {
			effortService.endEffort(effortId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping(value = "/{effortId}")
	public ResponseEntity<Object> deleteEffort(@PathVariable Long effortId) {
		try {
			effortService.deleteEffort(effortId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

}
