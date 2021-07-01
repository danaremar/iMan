package com.iman.rest;

import java.util.Date;
import java.util.List;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iman.model.projects.Project;
import com.iman.model.projects.ProjectCreateDto;
import com.iman.model.projects.ProjectUpdateDto;
import com.iman.service.projects.ProjectService;
import com.iman.service.users.UserService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/project")
@Api(tags = "Project")
public class ProjectRestController {
	
	@Autowired
	ProjectService projectService;
	
	@Autowired
	UserService userService;
	
	@Autowired(required = true)
	protected ModelMapper modelMapper;
	
	public ProjectRestController(ProjectService projectService, UserService userService, ModelMapper modelMapper) {
		this.projectService = projectService;
		this.userService = userService;
		this.modelMapper = modelMapper;
	}

	@PostMapping
	public ResponseEntity<Object> createProject(@RequestBody @Valid ProjectCreateDto projectCreateDto) {
		Project project = modelMapper.map(projectCreateDto, Project.class);
		project.setActive(true);
		project.setCreationDate(new Date());
		try {
			projectService.createProject(project);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping
	public ResponseEntity<Object> updateProject(@RequestBody @Valid ProjectUpdateDto projectUpdateDto) {
		Project project = modelMapper.map(projectUpdateDto, Project.class);
		try {
			projectService.update(project);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping(value="/enable-disable/{projectId}")
	public ResponseEntity<Object> enableDisableProject(@PathVariable Long projectId) {
		try {
			projectService.enableOrDisableById(projectId);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value="/my-projects")
	public ResponseEntity<Object> getAllUserProjects(){
		try {
			List<Project> projects = projectService.findAllMyProjects();
			return new ResponseEntity<>(projects, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	

}
