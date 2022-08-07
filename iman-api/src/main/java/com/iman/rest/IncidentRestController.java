package com.iman.rest;

import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
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

import com.iman.model.incident.Incident;
import com.iman.model.incident.IncidentCreateDto;
import com.iman.model.incident.IncidentListDto;
import com.iman.model.incident.IncidentSearch;
import com.iman.model.incident.IncidentShowDto;
import com.iman.model.incident.IncidentUpdateCreateDto;
import com.iman.model.incident.IncidentUpdateDto;
import com.iman.model.incident.IncidentUpdateShowDto;
import com.iman.model.util.Message;
import com.iman.service.incident.IncidentService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/incident")
@Api(tags = "Incident")
@CrossOrigin
public class IncidentRestController {

	@Autowired
	private IncidentService incidentService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	public IncidentRestController(IncidentService incidentService, ModelMapper modelMapper) {
		this.incidentService = incidentService;
		this.modelMapper = modelMapper;
	}

	@GetMapping(value = "/{incidentId}")
	public ResponseEntity<Object> getIncidentById(@PathVariable Long incidentId) {
		try {
			Incident incident = incidentService.findIncidentVerifiedById(incidentId);
			IncidentShowDto incidentShowDto = incidentService.mapIncidentToShow(incident);
			return new ResponseEntity<>(incidentShowDto, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping(value = "/{incidentId}/updates")
	public ResponseEntity<Object> getIncidentUpdatesByIncidentId(@PathVariable Long incidentId) {
		try {
			Incident incident = incidentService.findIncidentVerifiedById(incidentId);
			List<IncidentUpdateShowDto> updates = incidentService.findIncidentUpdates(incident);
			return new ResponseEntity<>(updates, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping(value = "/project/{projectId}")
	public ResponseEntity<Object> getIncidentsByProject(@Valid IncidentSearch incidentSearch,
			@PathVariable Long projectId, Pageable pageable) {
		try {
			Page<Incident> incidentPage = incidentService.findIncidents(incidentSearch, projectId, pageable);
			Page<IncidentListDto> incidentListDtoPage = incidentService.mapPageToPageDto(incidentPage);
			return new ResponseEntity<>(incidentListDtoPage, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PostMapping(value = "/")
	public ResponseEntity<Object> createIncident(@RequestBody @Valid IncidentCreateDto incidentCreateDto) {
		try {
			incidentService.createIncident(incidentCreateDto);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/")
	public ResponseEntity<Object> updateIncident(@RequestBody @Valid IncidentUpdateDto incidentUpdateDto) {
		try {
			incidentService.updateIncident(incidentUpdateDto);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping(value = "/{incidentId}")
	public ResponseEntity<Object> disableIncident(@RequestBody @Valid IncidentUpdateDto incidentUpdateDto,
			@PathVariable Long incidentId) {
		try {
			incidentService.disableIncident(incidentId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping(value = "/{incidentId}/update")
	public ResponseEntity<Object> createIncidentUpdate(@RequestBody @Valid IncidentUpdateCreateDto incidentUpdateCreateDto,
			@PathVariable Long incidentId) {
		try {
			incidentService.createIncidentUpdate(incidentUpdateCreateDto, incidentId);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	
	

}
