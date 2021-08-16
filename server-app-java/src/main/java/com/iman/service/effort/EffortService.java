package com.iman.service.effort;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

import javax.ws.rs.NotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.config.ImanMessages;
import com.iman.model.effort.Effort;
import com.iman.model.effort.EffortShowDto;
import com.iman.model.effort.EffortStartDto;
import com.iman.model.effort.EffortUpdateDto;
import com.iman.model.kanban.KanbanTask;
import com.iman.model.projects.Project;
import com.iman.model.projects.ProjectShowDto;
import com.iman.model.sprints.Sprint;
import com.iman.model.sprints.SprintShowDto;
import com.iman.repository.effort.EffortRepository;
import com.iman.service.kanban.KanbanService;
import com.iman.service.sprints.SprintService;
import com.iman.service.users.UserService;

@Service
public class EffortService {

	@Autowired
	private EffortRepository effortRepository;

	@Autowired
	private UserService userService;

	@Autowired
	private SprintService sprintService;

	@Autowired
	private KanbanService kanbanService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	private Effort findEffortById(Long effortId) {
		return effortRepository.findById(effortId).orElseThrow(() -> new NotFoundException("Effort doesn't found"));
	}

	private void addKanbanTaskToEffort(Long kanbanTaskId, Effort effort) {
		if (kanbanTaskId != null && !kanbanTaskId.equals(0L)) {
			KanbanTask kanbanTask = kanbanService.findTaskById(kanbanTaskId);
			kanbanService.verifyVisitor(kanbanTask.getKanbanColumn().getSprint());
			effort.setKanbanTask(kanbanTask);
		} else {
			effort.setKanbanTask(null);
		}
	}

	public void verifyUser(Effort effort) {
		if (effort == null || !effort.getUser().getUsername().equals(userService.getCurrentUsername())) {
			throw new AccessDeniedException(ImanMessages.USER_NOT_ALLOWED);
		}
	}

	private List<EffortShowDto> generateEffortShowDtoList(Example<Effort> example) {
		List<Effort> efforts = effortRepository.findAll(example, Sort.by(Sort.Direction.DESC, "startDate"));
		return efforts.stream().map(x -> getEffortShowDto(x)).collect(Collectors.toList());
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

	@Transactional
	public List<EffortShowDto> getAllMyEfforts() {
		Effort exampleEffort = new Effort();
		exampleEffort.setUser(userService.getCurrentUser());
		Example<Effort> example = Example.of(exampleEffort);
		return generateEffortShowDtoList(example);
	}

	@Transactional
	public List<EffortShowDto> getAllEffortsByTaskId(Long taskId) {
		KanbanTask kanbanTask = kanbanService.findTaskById(taskId);
		kanbanService.verifyVisitor(kanbanTask.getKanbanColumn().getSprint());
		Effort exampleEffort = new Effort();
		exampleEffort.setKanbanTask(kanbanTask);
		Example<Effort> example = Example.of(exampleEffort);
		return generateEffortShowDtoList(example);
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
		if (effortUpdateDto.getKanbanTaskId().equals(effort.getKanbanTask().getId())) {
			addKanbanTaskToEffort(effortUpdateDto.getId(), effort);
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
