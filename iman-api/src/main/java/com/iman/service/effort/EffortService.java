package com.iman.service.effort;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.NotFoundException;

import org.apache.commons.lang3.StringUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.config.ImanMessages;
import com.iman.model.effort.Effort;
import com.iman.model.effort.EffortSearchDto;
import com.iman.model.effort.EffortShowDto;
import com.iman.model.effort.EffortStartDto;
import com.iman.model.effort.EffortUpdateDto;
import com.iman.model.kanban.KanbanColumn;
import com.iman.model.kanban.KanbanTask;
import com.iman.model.projects.Project;
import com.iman.model.projects.ProjectShowDto;
import com.iman.model.sprints.Sprint;
import com.iman.model.sprints.SprintShowDto;
import com.iman.model.users.User;
import com.iman.repository.effort.EffortRepository;
import com.iman.service.kanban.KanbanService;
import com.iman.service.projects.ProjectService;
import com.iman.service.sprints.SprintService;
import com.iman.service.users.UserService;

@Service
public class EffortService {

	@Autowired
	EffortRepository effortRepository;

	@Autowired
	UserService userService;
	
	@Autowired
    ProjectService projectService;

	@Autowired
	SprintService sprintService;

	@Autowired
	KanbanService kanbanService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	Effort findEffortById(Long effortId) {
		return effortRepository.findById(effortId).orElseThrow(() -> new NotFoundException("Effort doesn't found"));
	}

	void addKanbanTaskToEffort(Long kanbanTaskId, Effort effort) {
		if (kanbanTaskId != null && !kanbanTaskId.equals(0L)) {
			KanbanTask kanbanTask = kanbanService.findTaskById(kanbanTaskId);
			kanbanService.verifyVisitor(kanbanTask.getKanbanColumn().getSprint());
			effort.setKanbanTask(kanbanTask);
		} else {
			effort.setKanbanTask(null);
		}
	}

	void verifyUser(Effort effort) {
		if (effort == null || !effort.getUser().getUsername().equals(userService.getCurrentUsername())) {
			throw new AccessDeniedException(ImanMessages.USER_NOT_ALLOWED);
		}
	}
	
	Page<EffortShowDto> mapPageToPageDto(Page<Effort> effortPage) {
	    return effortPage.map(this::getEffortShowDto);
	}

	public EffortShowDto getEffortShowDto(Effort effort) {
		EffortShowDto effortShowDto = modelMapper.map(effort, EffortShowDto.class);
		if (effort.getKanbanTask() != null) {
			Sprint s = sprintService.findById(effort.getKanbanTask().getKanbanColumn().getSprint().getId());
			effortShowDto.setSprint(modelMapper.map(s, SprintShowDto.class));
			Project p = effort.getKanbanTask().getKanbanColumn().getSprint().getProject();
			effortShowDto.setProject(modelMapper.map(p, ProjectShowDto.class));
		}
		return effortShowDto;
	}
	
	public Page<EffortShowDto> getAllEfforts(EffortSearchDto effortSearchDto, Pageable pageable) {

        Project project = null;
        Sprint sprint = null;
        User user = new User();

        // Sprint priority over Project
        if (effortSearchDto.getSprintId() != null) {
            sprint = sprintService.findById(effortSearchDto.getSprintId());
            project = sprint.getProject();
            projectService.verifyUserRelatedWithProject(project);
            
        // Project selected but no Sprint
        } else if (effortSearchDto.getProjectId() != null) {
            project = projectService.findProjectById(effortSearchDto.getProjectId());
            projectService.verifyUserRelatedWithProject(project);
            
        // only shows users effort
        } else {
            user.setUsername(userService.getCurrentUsername());
        }
        
        // set id
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        // Matcher & example
        Effort effort = new Effort();
        effort.setDescription(effortSearchDto.getDescription());
        effort.setStartDate(effortSearchDto.getStartDate());
        effort.setEndDate(effortSearchDto.getEndDate());
        
        // selected project or sprint
        if(project != null) {
            user.setUsername(effortSearchDto.getUsername());
        }
        effort.setUser(user);
        
        KanbanTask task = new KanbanTask();
        
        // Task priority over column
        if(effortSearchDto.getTaskId() != null) {
            task.setId(effortSearchDto.getTaskId());
            
        // Column selected but no Task
        } else if(effortSearchDto.getColumnId() != null) {
            KanbanColumn column = new KanbanColumn();
            column.setId(effortSearchDto.getColumnId());
            task.setKanbanColumn(column);
        } else {
			task = null;
		}
        effort.setDescription(null);
        effort.setKanbanTask(task);
        
        ExampleMatcher matcher = ExampleMatcher.matching().withIgnoreCase()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING);
        Example<Effort> example = Example.of(effort, matcher);
        
        ////////////////////////////////////////////////////////////////////////////////////////////
        
        // Find
        Page<Effort> effortPage = effortRepository.findAll(example, pageable);
        return mapPageToPageDto(effortPage);
	}

	@Transactional
	public Effort findMyStartedEffort() {
		List<Effort> ls = effortRepository.findLastActiveEffort(userService.getCurrentUserId());
		if (ls.isEmpty()) {
			return null;
		} else {
			return ls.get(0);
		}
	}
	
	@Transactional
	public EffortShowDto findMyStartedEffortDto() {
		Effort effort = findMyStartedEffort();
		if (effort==null) {
			return null;
		} else {
			return getEffortShowDto(effort);
		}
	}

	@Transactional
	public void startEffort(EffortStartDto effortStartDto) {
		Effort previousEffort = findMyStartedEffort();
		if (previousEffort != null) {
			previousEffort.setEndDate(new Date());
			effortRepository.save(previousEffort);
		}

		Effort effort = modelMapper.map(effortStartDto, Effort.class);
		addKanbanTaskToEffort(effortStartDto.getKanbanTaskId(), effort);
		effort.setId(null);
		effort.setStartDate(new Date());
		effort.setUser(userService.getCurrentUser());
		effort.setDescription(effortStartDto.getDescription());

		effortRepository.save(effort);
	}

	@Transactional
	public void updateEffort(EffortUpdateDto effortUpdateDto) {
		Effort effort = findEffortById(effortUpdateDto.getId());
		verifyUser(effort);
		effort.setDescription(effortUpdateDto.getDescription());
		if (effortUpdateDto.getStartDate() != null) {
			effort.setStartDate(effortUpdateDto.getStartDate());
		}
		if (effortUpdateDto.getEndDate() != null) {
			effort.setEndDate(effortUpdateDto.getEndDate());
		}
		if (effort.getKanbanTask()!=null && effortUpdateDto.getKanbanTaskId().equals(effort.getKanbanTask().getId())) {
			addKanbanTaskToEffort(effortUpdateDto.getKanbanTaskId(), effort);
		}
		effortRepository.save(effort);
	}

	@Transactional
	public void endEffort(Long effortId) {
		Effort effort = findEffortById(effortId);
		verifyUser(effort);
		effort.setEndDate(new Date());
		effortRepository.save(effort);
	}

	@Transactional
	public void deleteEffort(Long effortId) {
		Effort effort = findEffortById(effortId);
		verifyUser(effort);
		effortRepository.delete(effort);
	}

}
