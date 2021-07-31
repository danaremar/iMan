package com.iman.service.sprints;

import java.util.Date;
import java.util.List;

import javax.ws.rs.NotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.iman.model.projects.Project;
import com.iman.model.sprints.Sprint;
import com.iman.model.sprints.SprintCreateDto;
import com.iman.model.sprints.SprintUpdateDto;
import com.iman.repository.sprints.SprintRepository;
import com.iman.service.projects.ProjectService;

@Service
public class SprintService {

	@Autowired
	private SprintRepository sprintRepository;

	@Autowired
	private ProjectService projectService;
	
	public Sprint findById(Long sprintId) {
		Sprint exampleSprint = new Sprint();
		exampleSprint.setId(sprintId);
		exampleSprint.setActive(true);

		Example<Sprint> example = Example.of(exampleSprint);
		return sprintRepository.findOne(example).orElseThrow(()->new NotFoundException("Sprint doesn't found"));
	}

	@Transactional
	public List<Sprint> findSprintsByProjectId(Long projectId) {
		Project project = projectService.findProjectById(projectId);
		projectService.verifyUserRelatedWithProject(project);

		Sprint exampleSprint = new Sprint();
		exampleSprint.setProject(project);
		exampleSprint.setActive(true);

		Example<Sprint> example = Example.of(exampleSprint);
		return sprintRepository.findAll(example, Sort.by(Sort.Direction.ASC, "number"));
	}

	@Transactional
	public Long countSprintsByProject(Project project) {
		Sprint exampleSprint = new Sprint();
		exampleSprint.setProject(project);
		Example<Sprint> example = Example.of(exampleSprint);
		return sprintRepository.count(example);
	}

	@Transactional
	public void createSprint(SprintCreateDto sprint) {
		Project project = projectService.findProjectById(sprint.getProjectId());
		projectService.verifyOwnerOrAdmin(project);

		Long number = countSprintsByProject(project) + 1L;

		Sprint newSprint = new Sprint();
		newSprint.setNumber(number);
		newSprint.setTitle(sprint.getTitle());
		newSprint.setDescription(sprint.getDescription());
		newSprint.setCreationDate(new Date());
		newSprint.setStartDate(sprint.getStartDate());
		newSprint.setEstimatedDate(sprint.getEstimatedDate());
		newSprint.setProject(project);
		newSprint.setActive(true);

		sprintRepository.save(newSprint);
	}
	
	@Transactional
	public void updateSprint(SprintUpdateDto sprint) {
		Sprint sprintOld = findById(sprint.getId());
		projectService.verifyOwnerOrAdmin(sprintOld.getProject());
		
		sprintOld.setTitle(sprint.getTitle());
		sprintOld.setDescription(sprint.getDescription());
		sprintOld.setStartDate(sprint.getStartDate());
		sprintOld.setEstimatedDate(sprint.getEstimatedDate());
		sprintOld.setCloseDate(sprint.getCloseDate());
		
		sprintRepository.save(sprintOld);
	}
	
	@Transactional
	public void startSprint(Long sprintId) {
		Sprint sprintOld = findById(sprintId);
		projectService.verifyOwnerOrAdmin(sprintOld.getProject());
		sprintOld.setStartDate(new Date());
		sprintRepository.save(sprintOld);
	}
	
	@Transactional
	public void closeSprint(Long sprintId) {
		Sprint sprintOld = findById(sprintId);
		projectService.verifyOwnerOrAdmin(sprintOld.getProject());
		sprintOld.setCloseDate(new Date());
		sprintRepository.save(sprintOld);
	}
	
	@Transactional
	public void enableSprint(Long sprintId) {
		Sprint sprintOld = findById(sprintId);
		projectService.verifyOwnerOrAdmin(sprintOld.getProject());
		if(!sprintOld.getActive()) {
			sprintOld.setActive(true);
			sprintRepository.save(sprintOld);
		}
	}
	
	@Transactional
	public void disableSprint(Long sprintId) {
		Sprint sprintOld = findById(sprintId);
		projectService.verifyOwnerOrAdmin(sprintOld.getProject());
		if(sprintOld.getActive()) {
			sprintOld.setActive(false);
			sprintRepository.save(sprintOld);
		}
	}
	
	@Transactional
	public void deleteSprint(Long sprintId) {
		Sprint sprintOld = findById(sprintId);
		projectService.verifyOwnerOrAdmin(sprintOld.getProject());
		sprintRepository.delete(sprintOld);
	}

}
