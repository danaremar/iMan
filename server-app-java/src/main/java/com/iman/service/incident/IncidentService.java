package com.iman.service.incident;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.model.incident.Incident;
import com.iman.model.incident.IncidentCreateDto;
import com.iman.model.incident.IncidentListDto;
import com.iman.model.incident.IncidentSearch;
import com.iman.model.incident.IncidentShowDto;
import com.iman.model.incident.IncidentUpdate;
import com.iman.model.incident.IncidentUpdateCreateDto;
import com.iman.model.incident.IncidentUpdateDto;
import com.iman.model.incident.IncidentUpdateShowDto;
import com.iman.model.projects.Project;
import com.iman.model.users.User;
import com.iman.model.users.UserShowDto;
import com.iman.repository.incidents.IncidentRepository;
import com.iman.repository.incidents.IncidentUpdateRepository;
import com.iman.service.projects.ProjectService;
import com.iman.service.users.UserService;

@Service
public class IncidentService {

	@Autowired
	private IncidentRepository incidentRepository;

	@Autowired
	private IncidentUpdateRepository incidentUpdateRepository;

	@Autowired
	private ProjectService projectService;

	@Autowired
	private UserService userService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	// No contains IncidentUpdates
	public IncidentListDto mapIncidentToList(Incident incident) {
		IncidentListDto incidentListDto = modelMapper.map(incident, IncidentListDto.class);
		incidentListDto.setUsername(incident.getUser().getUsername());

		if (incident.getAssignedUser() != null && StringUtils.isNotBlank(incident.getAssignedUser().getUsername())) {
			incidentListDto.setAssignedUsername(incident.getAssignedUser().getUsername());
		}
		return incidentListDto;
	}

	public Page<IncidentListDto> mapPageToPageDto(Page<Incident> incidentPage) {
		return incidentPage.map(this::mapIncidentToList);
	}

	// Contains IncidentUpdates
	public IncidentShowDto mapIncidentToShow(Incident incident) {
		IncidentShowDto incidentShowDto = modelMapper.map(incident, IncidentShowDto.class);
		incidentShowDto.setUsername(incident.getUser().getUsername());
		if (incident.getAssignedUser() != null && StringUtils.isNotBlank(incident.getAssignedUser().getUsername())) {
			incidentShowDto.setAssignedUsername(incident.getAssignedUser().getUsername());
		}
		incidentShowDto.setUpdates(findIncidentUpdates(incident));
		return incidentShowDto;
	}
	
	public IncidentUpdateShowDto mapIncidentUpdateToShow(IncidentUpdate incidentUpdate) {
		IncidentUpdateShowDto incidentShowDto = modelMapper.map(incidentUpdate, IncidentUpdateShowDto.class);
		incidentShowDto.setUser(modelMapper.map(incidentUpdate.getUser(), UserShowDto.class));
		if (incidentUpdate.getAssignedUser() != null && StringUtils.isNotBlank(incidentUpdate.getAssignedUser().getUsername())) {
			incidentShowDto.setAssignedUser(modelMapper.map(incidentUpdate.getAssignedUser(), UserShowDto.class));
		}
		return incidentShowDto;
	}

	public Incident findIncidentById(Long id) {
		return incidentRepository.findById(id).orElseThrow();
	}

	public Incident findIncidentVerifiedById(Long id) {
		Incident incident = findIncidentById(id);
		projectService.verifyUserRelatedWithProject(incident.getProject());
		return incident;
	}

	public List<IncidentUpdateShowDto> findIncidentUpdates(Incident incident) {
		return incident.getUpdates().stream()
			.map(this::mapIncidentUpdateToShow)
			.collect(Collectors.toList());
	}

	public IncidentUpdate findIncidentUpdateById(Long id) {
		return incidentUpdateRepository.findById(id).orElseThrow();
	}

	public Long countIncidentsInProject(Project project) {
		Incident exampleIncident = new Incident();
		exampleIncident.setProject(project);
		Example<Incident> example = Example.of(exampleIncident);
		return incidentRepository.count(example);
	}

	@Transactional
	public void createIncident(IncidentCreateDto incidentCreateDto) {
		Project project = projectService.findProjectById(incidentCreateDto.getProjectId());
		projectService.verifyOwnerOrAdmin(project);

		Incident incident = modelMapper.map(incidentCreateDto, Incident.class);
		incident.setCode(countIncidentsInProject(project));
		incident.setActive(true);
		incident.setLastModification(new Date());
		incident.setDate(new Date());
		incident.setUser(userService.getCurrentUser());

		incidentRepository.save(incident);
	}

	@Transactional
	public void updateIncident(IncidentUpdateDto incidentUpdateDto) {
		Incident incident = findIncidentById(incidentUpdateDto.getId());
		projectService.verifyMember(incident.getProject());

		incident.setTitle(incidentUpdateDto.getTitle());
		incident.setDescription(incidentUpdateDto.getDescription());
		incident.setReported(incidentUpdateDto.getReported());
		incident.setLastModification(new Date());

		incidentRepository.save(incident);
	}

	@Transactional
	public void disableIncident(Long incidentId) {
		Incident incident = findIncidentById(incidentId);
		projectService.verifyMember(incident.getProject());

		incident.setActive(false);
		incidentRepository.save(incident);
	}

	
	/* FIND BY FILTER, SORTING & PAGING*/
	public Page<Incident> findIncidents(IncidentSearch incidentSearch, Long projectId, Pageable pageable) {
		
		/* PERMISSIONS */
		Project project = projectService.findProjectById(projectId);
		projectService.verifyUserRelatedWithProject(project);

		/* NON-RELATIVE TO FIND */
		User user = new User();
		user.setUsername(incidentSearch.getUsername());
		User assignedUser = new User();
		assignedUser.setUsername(incidentSearch.getAssignedUsername());
		
		/* MATCHER & EXAMPLE */
		Incident incident = modelMapper.map(incidentSearch, Incident.class);
		incident.setUser(user);
		incident.setAssignedUser(assignedUser);
		incident.setProject(project);
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase()
				.withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
		Example<Incident> example = Example.of(incident, matcher);

		/* FIND */
		return incidentRepository.findAll(example, pageable);
	}

	@Transactional
	public void createIncidentUpdate(IncidentUpdateCreateDto incidentUpdateCreateDto, Long incidentId) {
		Incident incident = findIncidentById(incidentId);
		projectService.verifyMember(incident.getProject());

		// assignedUser -> Incident & IncidentUpdate
		User assignedUser = null;
		if (StringUtils.isNotBlank(incidentUpdateCreateDto.getAssignedUsername())) {
			assignedUser = userService.findUserByUsername(incidentUpdateCreateDto.getAssignedUsername());
		}

		updateIncident(incidentUpdateCreateDto, incident, assignedUser);

		// SAVE -> IncidentUpdate
		IncidentUpdate incidentUpdate = modelMapper.map(incidentUpdateCreateDto, IncidentUpdate.class);
		incidentUpdate.setIncident(incident);
		incidentUpdate.setUser(userService.getCurrentUser());
		incidentUpdate.setDate(new Date());
		incidentUpdate.setAssignedUser(assignedUser);
		incidentUpdateRepository.save(incidentUpdate);

	}

	private void updateIncident(IncidentUpdateCreateDto incidentUpdateCreateDto, Incident incident,
			User assignedUser) {
		Double estimatedTime = incidentUpdateCreateDto.getEstimatedTime();
		if (estimatedTime != null) {
			incident.setEstimatedTime(estimatedTime);
		}
		String affects = incidentUpdateCreateDto.getAffects();
		if (StringUtils.isNotBlank(affects)) {
			incident.setAffects(affects);
		}
		Integer priority = incidentUpdateCreateDto.getPriority();
		if (priority != null) {
			incident.setPriority(priority);
		}
		String status = incidentUpdateCreateDto.getStatus();
		if (StringUtils.isNotBlank(status)) {
			incident.setStatus(status);
		}
		if (assignedUser != null) {
			incident.setAssignedUser(assignedUser);
		}
		incident.setLastModification(new Date());
		incidentRepository.save(incident);
	}

}
