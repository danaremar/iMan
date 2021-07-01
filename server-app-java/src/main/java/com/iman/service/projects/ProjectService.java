package com.iman.service.projects;

import java.util.Date;
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
import com.iman.security.exception.UnverifiedUserException;
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

	private void verifyOwner(String username, Project project) {
		if (project.getProjectRoles().stream()
				.anyMatch(x -> (x.getRole() == 0) && (x.getUser().getUsername().equals(username)))) {
			throw new UnverifiedUserException();
		}
	}

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
		projectRole.setRole(0); // OWNER
		projectRole.setUser(userService.getCurrentUser());
		projectRole.setProject(projectSaved);

		projectRoleRepository.save(projectRole);
	}

	@Transactional
	public void update(Project newProject) {
		String username = userService.getCurrentUsername();
		Project oldProject = findProjectById(newProject.getId());

		verifyOwner(username, oldProject);

		if (!oldProject.getActive().equals(newProject.getActive())) {
			oldProject.setActive(newProject.getActive());
			if (!newProject.getActive()) {
				oldProject.setDeleteDate(new Date());
			} else {
				oldProject.setDeleteDate(null);
			}
		}

		oldProject.setName(newProject.getName());
		oldProject.setDescription(newProject.getName());

		projectRepository.save(oldProject);
	}

	@Transactional
	public void enableOrDisableById(Long projectId) {
		String username = userService.getCurrentUsername();
		Project project = findProjectById(projectId);

		verifyOwner(username, project);

		Boolean activeNow = !project.getActive();
		project.setActive(activeNow);
		if (!activeNow) {
			project.setDeleteDate(new Date());
		} else {
			project.setDeleteDate(null);
		}
		projectRepository.save(project);
	}

	@Transactional
	public List<Project> findAllMyProjects() {
		Long userId = userService.getCurrentUserId();
		return findAllProjectsByUserId(userId);
	}

	@Transactional
	public List<Project> findAllProjectsByUserId(Long userId) {
		return projectRepository.findAllProjectsByUserId(userId);
	}

	/*
	 * PROJECT ROLES
	 * 
	 */

	@Transactional
	public void acceptOrDeclineProjectRole(Long projectRoleId, Boolean accept) {
		ProjectRole projectRole = findProjectRoleById(projectRoleId);
		if (!projectRole.getUser().getUsername().equals(userService.getCurrentUsername())) {
			throw new UnverifiedUserException();
		}
		projectRole.setAccepted(accept);
		projectRoleRepository.save(projectRole);
	}

	@Transactional
	public void changeRole(Long projectRoleId, Integer role) {
		String username = userService.getCurrentUsername();
		ProjectRole projectRole = findProjectRoleById(projectRoleId);
		verifyOwner(username, projectRole.getProject());
		projectRole.setRole(role);
		projectRoleRepository.save(projectRole);
	}

	@Transactional
	public void updateProjectRole(ProjectRole projectRole) {
		projectRoleRepository.save(projectRole);
	}

	@Transactional
	public void insertProjectRole(Integer role, Long projectId, String username) {
		Integer roleAssigned = role == null ? 3 : role;
		Long userId = userService.findUserByUsername(username).getId();
		entityManager.createNativeQuery("INSERT INTO project2role(`role`, project_id, user_id) VALUES(?, ?, ?);")
				.setParameter(1, roleAssigned).setParameter(2, projectId).setParameter(3, userId).executeUpdate();
	}

}
