package com.iman.rest;

import java.util.Date;
import java.util.List;

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

import com.iman.model.projects.Project;
import com.iman.model.projects.ProjectCreateDto;
import com.iman.model.projects.ProjectRole;
import com.iman.model.projects.ProjectRoleCreateDto;
import com.iman.model.projects.ProjectRoleNotAcceptedDto;
import com.iman.model.projects.ProjectRoleUpdateDto;
import com.iman.model.projects.ProjectUpdateDto;
import com.iman.model.users.User;
import com.iman.model.util.Message;
import com.iman.service.projects.ProjectService;
import com.iman.service.users.UserService;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/project")
@Tag(name = "Project")
@SecurityRequirement(name = "Bearer Authentication")
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
		try {
			Project project = modelMapper.map(projectCreateDto, Project.class);
			project.setActive(true);
			project.setCreationDate(new Date());
			projectService.createProject(project);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping
	public ResponseEntity<Object> updateProject(@RequestBody @Valid ProjectUpdateDto projectUpdateDto) {
		try {
			Project project = modelMapper.map(projectUpdateDto, Project.class);
			projectService.update(project);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/enable-disable/{projectId}")
	public ResponseEntity<Object> enableDisableProject(@PathVariable Long projectId) {
		try {
			projectService.enableOrDisableById(projectId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@GetMapping(value = "/my-projects")
	public ResponseEntity<Object> getAllUserProjects() {
		try {
			List<Project> projects = projectService.findAllMyProjects();
			return new ResponseEntity<>(projects, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}

	}

	@PostMapping(value = "/role")
	public ResponseEntity<Object> createRoleProject(@RequestBody @Valid ProjectRoleCreateDto projectRoleCreateDto) {
		try {
			User user = userService.findUserByUsername(projectRoleCreateDto.getUsername());
			if (user == null) throw new NullPointerException("User doesn't exists in the system");

			Project project = projectService.findProjectById(projectRoleCreateDto.getProjectId());
			if (project == null) throw new NullPointerException("Project doesn't exists in the system");

			ProjectRole projectRole = new ProjectRole();
			projectRole.setProject(project);
			projectRole.setUser(user);
			projectRole.setRole(projectRoleCreateDto.getRole());

			projectService.createRole(projectRole);

			return new ResponseEntity<>(HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/role")
	public ResponseEntity<Object> updateRoleProject(@RequestBody @Valid ProjectRoleUpdateDto projectRoleUpdateDto) {
		try {
			ProjectRole projectRole = new ProjectRole();
			projectRole.setId(projectRoleUpdateDto.getId());
			projectRole.setRole(projectRoleUpdateDto.getRole());

			projectService.updateRole(projectRole);

			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@PutMapping(value = "/role/{roleId}/accept")
	public ResponseEntity<Object> acceptRoleProject(@PathVariable Long roleId) {
		try {
			projectService.acceptProjectRole(roleId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

	@DeleteMapping(value = "/role/{roleId}/decline")
	public ResponseEntity<Object> deleteRoleProject(@PathVariable Long roleId) {
		try {
			projectService.deleteProjectRole(roleId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@GetMapping(value= "/my-roles")
	public ResponseEntity<Object> getAllMyInvitations() {
		try {
			User user = userService.getCurrentUser();
			List<ProjectRoleNotAcceptedDto> allInvitations = projectService.getAllInvitationsFromUser(user);
			return new ResponseEntity<>(allInvitations, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}

}
