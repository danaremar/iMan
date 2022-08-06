package com.iman.service.actives;

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

import com.iman.model.actives.Active;
import com.iman.model.actives.ActiveCreateDto;
import com.iman.model.actives.ActiveListDto;
import com.iman.model.actives.ActiveSearchDto;
import com.iman.model.actives.ActiveShowDto;
import com.iman.model.actives.ActiveUpdateDto;
import com.iman.model.actives.ActiveUsers;
import com.iman.model.actives.ActiveUsersCreateDto;
import com.iman.model.projects.Project;
import com.iman.model.users.User;
import com.iman.repository.active.ActiveRepository;
import com.iman.service.projects.ProjectService;
import com.iman.service.users.UserService;

@Service
public class ActiveService {

	@Autowired
	private ActiveRepository activeRepository;

	@Autowired
	private ProjectService projectService;

	@Autowired
	private UserService userService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	/*
	 * AUX
	 * 
	 */

	public ActiveListDto mapActiveToList(Active active) {
		return modelMapper.map(active, ActiveListDto.class);
	}

	public Page<ActiveListDto> mapPageToPageDto(Page<Active> activePage) {
		return activePage.map(this::mapActiveToList);
	}

	public Active findActiveById(Long id) {
		return activeRepository.findById(id).orElseThrow();
	}

	public Long countActivesInProject(Project project) {
		Active exampleActive = new Active();
		exampleActive.setProject(project);
		Example<Active> example = Example.of(exampleActive);
		return activeRepository.count(example);
	}

	/*
	 * FIND BY FILTER, SORTING & PAGING
	 * 
	 */
	public Page<ActiveListDto> findActives(ActiveSearchDto activeSearchDto, Long projectId, Pageable pageable) {

		// Permissions
		Project project = projectService.findProjectById(projectId);
		projectService.verifyUserRelatedWithProject(project);

		// Matcher & example
		Active active = modelMapper.map(activeSearchDto, Active.class);
		if (!StringUtils.isEmpty(activeSearchDto.getCreatedBy())) {
			User user = new User();
			user.setUsername(activeSearchDto.getCreatedBy());
			active.setCreatedBy(user);
		}
		if (!StringUtils.isEmpty(activeSearchDto.getModifiedBy())) {
			User user = new User();
			user.setUsername(activeSearchDto.getModifiedBy());
			active.setModifiedBy(user);
		}
		active.setProject(project);
		active.setActive(true);
		ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase()
				.withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
		Example<Active> example = Example.of(active, matcher);

		// Find
		Page<Active> activePage = activeRepository.findAll(example, pageable);
		return mapPageToPageDto(activePage);
	}

	/*
	 * SHOW
	 * 
	 */
	public Active findVerifiedActiveById(Long activeId) {
		Active active = findActiveById(activeId);
		projectService.verifyUserRelatedWithProject(active.getProject());
		return active;
	}

	public ActiveShowDto findVerifiedActiveShowById(Long activeId) {
		Active active = findVerifiedActiveById(activeId);
		return modelMapper.map(active, ActiveShowDto.class);
	}

	/*
	 * CREATE
	 * 
	 */

	public List<Active> getChildrenFromCreate(List<Long> childrens) {
		return childrens.stream().map(this::findVerifiedActiveById).collect(Collectors.toList());
	}

	public ActiveUsers mapActiveUserCreateDtoToActiveUser(ActiveUsersCreateDto activeUsersCreateDto,
			List<String> usernamesInProject) {
		ActiveUsers activeUsers = modelMapper.map(activeUsersCreateDto, ActiveUsers.class);
		if (!usernamesInProject.isEmpty() && StringUtils.isNotBlank(activeUsersCreateDto.getUsername())
				&& usernamesInProject.contains(activeUsersCreateDto.getUsername())) {
			activeUsers.setUser(userService.findUserByUsername(activeUsersCreateDto.getUsername()));
		} else {
			activeUsers.setUser(null);
		}
		return activeUsers;
	}

	public List<ActiveUsers> getActiveUsersFromCreate(List<ActiveUsersCreateDto> ls, Project project) {
		List<String> usernamesInProject = projectService.usernamesInProject(project);
		return ls.stream().map(x -> mapActiveUserCreateDtoToActiveUser(x, usernamesInProject))
				.collect(Collectors.toList());
	}

	@Transactional
	public void createActive(ActiveCreateDto activeCreateDto, Long projectId) {

		// Permissions
		Project project = projectService.findProjectById(projectId);
		projectService.verifyOwnerOrAdmin(project);

		// Creation
		Active active = modelMapper.map(activeCreateDto, Active.class);
		active.setId(null);
		active.setCode(countActivesInProject(project));
		active.setActive(true);
		active.setCreationDate(new Date());
		active.setCreatedBy(userService.getCurrentUser());
		active.setLastModification(new Date());
		active.setModifiedBy(userService.getCurrentUser());
		active.setProject(project);
		active.setChildren(getChildrenFromCreate(activeCreateDto.getChildren()));
		active.setActiveUsers(getActiveUsersFromCreate(activeCreateDto.getActiveUsers(), project));

		// Save
		activeRepository.save(active);
	}

	/*
	 * UPDATE
	 * 
	 */

	@Transactional
	public void updateActive(ActiveUpdateDto activeUpdateDto) {

		// Get previous active
		Active oldActive = findActiveById(activeUpdateDto.getId());

		// Permissions
		projectService.verifyOwnerOrAdmin(oldActive.getProject());

		// Update
		Active newActive = modelMapper.map(activeUpdateDto, Active.class);
		newActive.setId(oldActive.getId());
		newActive.setCreationDate(oldActive.getCreationDate());
		newActive.setActive(oldActive.getActive());
		newActive.setCreatedBy(oldActive.getCreatedBy());
		newActive.setLastModification(new Date());
		newActive.setModifiedBy(userService.getCurrentUser());

		// Create from scratch
		newActive.setChildren(getChildrenFromCreate(activeUpdateDto.getChildren()));
		newActive.setActiveUsers(getActiveUsersFromCreate(activeUpdateDto.getActiveUsers(), oldActive.getProject()));

		// Save
		activeRepository.save(newActive);

	}

	/*
	 * DISABLE -> Set no active
	 * 
	 */

	@Transactional
	public void disableActive(Long activeId) {

		// Get active
		Active active = findActiveById(activeId);
		
		// Permissions
		projectService.verifyOwnerOrAdmin(active.getProject());
		
		// Update
		active.setActive(false);
		active.setLastModification(new Date());
		active.setModifiedBy(userService.getCurrentUser());
		
		// Save
		activeRepository.save(active);
	}

}
