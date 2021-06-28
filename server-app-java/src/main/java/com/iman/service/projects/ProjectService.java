package com.iman.service.projects;

import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.model.projects.Project;
import com.iman.model.projects.ProjectRole;
import com.iman.repository.projects.ProjectRepository;
import com.iman.repository.projects.ProjectRoleRepository;
import com.iman.service.users.UserService;

@Service
public class ProjectService {
	
	@Autowired
	private ProjectRoleRepository projectRoleRepository;
	
	@Autowired
	private ProjectRepository projectRepository;
	
	@Autowired
	private UserService userService;
	
	@PersistenceContext
    private EntityManager entityManager;
	
	@Transactional
	public ProjectRole findProjectRoleById(Long id) {
		return projectRoleRepository.findById(id).orElseThrow();
	}
	
	@Transactional
	public Project findProjectById(Long id) {
		return projectRepository.findById(id).orElseThrow();
	}
	
	@Transactional
	public void createProject(Project project) {		
		Project projectSaved = projectRepository.save(project);
		
		ProjectRole projectRole = new ProjectRole();
		projectRole.setRole(0); 	// OWNER
		projectRole.setAccepted(true);
		projectRole.setUser(userService.getCurrentUser());
		projectRole.setProject(projectSaved);
		
		projectRoleRepository.save(projectRole);
	}
	
	@Transactional
	public List<Project> findAllMyProjects(){
		Long userId = userService.getCurrentUserId();
		return findAllProjectsByUserId(userId);
	}
	
	@Transactional
	public List<Project> findAllProjectsByUserId(Long userId){
		return projectRepository.findAllProjectsByUserId(userId);
	}

}
