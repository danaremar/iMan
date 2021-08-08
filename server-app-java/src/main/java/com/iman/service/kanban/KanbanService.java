package com.iman.service.kanban;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import javax.ws.rs.NotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Sort;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.iman.config.ImanMessages;
import com.iman.model.kanban.KanbanColumn;
import com.iman.model.kanban.KanbanColumnCreateDto;
import com.iman.model.kanban.KanbanColumnUpdateDto;
import com.iman.model.kanban.KanbanTask;
import com.iman.model.kanban.KanbanTaskCreateDto;
import com.iman.model.kanban.KanbanTaskUpdateDto;
import com.iman.model.sprints.Sprint;
import com.iman.repository.kanban.KanbanColumnRepository;
import com.iman.repository.kanban.KanbanTaskRepository;
import com.iman.service.sprints.SprintService;
import com.iman.service.users.UserService;

@Service
public class KanbanService {

	@Autowired
	private KanbanColumnRepository kanbanColumnRepository;

	@Autowired
	private KanbanTaskRepository kanbanTaskRepository;

	@Autowired
	private SprintService sprintService;

	@Autowired
	private UserService userService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	private void verifyAdminOrOwner(Sprint sprint) {
		String username = userService.getCurrentUsername();
		if (username == null || sprint == null || sprint.getProject() == null || !sprint.getProject().getActive()
				|| sprint.getProject().getProjectRoles() == null
				|| sprint.getProject().getProjectRoles().stream().noneMatch(
						x -> (List.of(0, 1).contains(x.getRole())) && (x.getUser().getUsername().equals(username)))) {
			throw new AccessDeniedException(ImanMessages.USER_NOT_ALLOWED);
		}
	}

	private void verifyMember(Sprint sprint) {
		String username = userService.getCurrentUsername();
		if (username == null || sprint == null || sprint.getProject() == null || !sprint.getProject().getActive()
				|| sprint.getProject().getProjectRoles() == null
				|| sprint.getProject().getProjectRoles().stream()
						.noneMatch(x -> (List.of(0, 1, 2).contains(x.getRole()))
								&& (x.getUser().getUsername().equals(username)))) {
			throw new AccessDeniedException(ImanMessages.USER_NOT_ALLOWED);
		}
	}

	@Transactional
	public KanbanColumn findColumnById(Long kanbanColumnId) {
		return kanbanColumnRepository.findById(kanbanColumnId)
				.orElseThrow(() -> new NotFoundException("Kanban column doesn't found"));
	}

	@Transactional
	public KanbanTask findTaskById(Long kanbanTaskId) {
		return kanbanTaskRepository.findById(kanbanTaskId)
				.orElseThrow(() -> new NotFoundException("Kanban task doesn't found"));
	}

	private List<KanbanColumn> filterActiveColumn(List<KanbanColumn> ls) {
		return ls.stream().filter(x -> x.getActive()).collect(Collectors.toList());
	}

	private void saveKanbanColumnOrder(KanbanColumn kanbanColumn, Long order) {
		kanbanColumn.setColumnOrder(order);
		kanbanColumnRepository.save(kanbanColumn);
	}

	@Transactional
	public List<KanbanColumn> findKanbanColumnsBySprintId(Long sprintId) {
		Sprint sprint = sprintService.findById(sprintId);
		KanbanColumn exampleKanbanColumn = new KanbanColumn();
		exampleKanbanColumn.setSprint(sprint);
		exampleKanbanColumn.setActive(true);
		Example<KanbanColumn> example = Example.of(exampleKanbanColumn);
		return kanbanColumnRepository.findAll(example, Sort.by(Sort.Direction.DESC, "columnOrder"));
	}

	private Long countKanbanColumns(Sprint sprint) {
		KanbanColumn kanbanColumnExample = new KanbanColumn();
		kanbanColumnExample.setActive(true);
		kanbanColumnExample.setSprint(sprint);
		Example<KanbanColumn> example = Example.of(kanbanColumnExample);
		return kanbanColumnRepository.count(example);

	}

	private void reorderAndSaveKanbanColumns(List<KanbanColumn> ls) {
		IntStream.range(0, ls.size()).filter(x -> ls.get(x).getColumnOrder().intValue() != x)
				.forEach(x -> saveKanbanColumnOrder(ls.get(x), (long) x));
	}
	
	private void moveKanbanColumn(Sprint sprint,KanbanColumn kanbanColumn, Integer columnOrder) {
		List<KanbanColumn> ls = filterActiveColumn(sprint.getKanbanColums());
		ls.remove(kanbanColumn);
		ls.add(columnOrder, kanbanColumn);
		reorderAndSaveKanbanColumns(ls);
	}

	@Transactional
	public void createKanbanColumn(KanbanColumnCreateDto kanbanTaskCreateDto) {
		Sprint sprint = sprintService.findById(kanbanTaskCreateDto.getSprintId());
		verifyAdminOrOwner(sprint);
		KanbanColumn kanbanColumn = modelMapper.map(kanbanTaskCreateDto, KanbanColumn.class);
		kanbanColumn.setColumnOrder(countKanbanColumns(sprint));
		kanbanColumn.setSprint(sprint);
		kanbanColumn.setActive(true);
		kanbanColumnRepository.save(kanbanColumn);
	}

	@Transactional
	public void updateKanbanColumn(KanbanColumnUpdateDto kanbanColumnUpdateDto) {
		KanbanColumn kanbanColumn = findColumnById(kanbanColumnUpdateDto.getId());
		verifyAdminOrOwner(kanbanColumn.getSprint());
		kanbanColumn.setTitle(kanbanColumnUpdateDto.getTitle());
		kanbanColumnRepository.save(kanbanColumn);
		if(kanbanColumnUpdateDto.getColumnOrder()!=null) {			
			moveKanbanColumn(kanbanColumn.getSprint(), kanbanColumn, kanbanColumnUpdateDto.getColumnOrder().intValue());
		}
	}

	@Transactional
	public void disableKanbanColumn(Long kanbanColumnId) {
		KanbanColumn kanbanColumn = findColumnById(kanbanColumnId);
		verifyAdminOrOwner(kanbanColumn.getSprint());
		kanbanColumn.setActive(false);
		kanbanColumnRepository.save(kanbanColumn);
		reorderAndSaveKanbanColumns(kanbanColumn.getSprint().getKanbanColums());
	}

	private Long countKanbanTaskByColumn(KanbanColumn kanbanColumn) {
		KanbanTask kanbanTaskExample = new KanbanTask();
		kanbanTaskExample.setActive(true);
		kanbanTaskExample.setKanbanColumn(kanbanColumn);
		Example<KanbanTask> example = Example.of(kanbanTaskExample);
		return kanbanTaskRepository.count(example);
	}
	
	private Long countKanbanTaskBySprint(Sprint sprint) {
		return sprint.getKanbanColums().stream()
				.flatMap(x -> x.getTasks().stream())
				.count();
	}

	@Transactional
	public void createKanbanTask(KanbanTaskCreateDto kanbanTaskCreateDto) {
		KanbanColumn kanbanColumn = findColumnById(kanbanTaskCreateDto.getKanbanColumnId());
		verifyMember(kanbanColumn.getSprint());
		KanbanTask kanbanTask = modelMapper.map(kanbanTaskCreateDto, KanbanTask.class);
		kanbanTask.setId(null);
		kanbanTask.setKanbanColumn(kanbanColumn);
		kanbanTask.setCreationDate(new Date());
		kanbanTask.setNumber(countKanbanTaskBySprint(kanbanColumn.getSprint()));
		kanbanTask.setOrderInColumn(countKanbanTaskByColumn(kanbanColumn)); // set last orderInColumn
		kanbanTask.setActive(true);
		kanbanTaskRepository.save(kanbanTask);
	}

	@Transactional
	public void updateKanbanTask(KanbanTaskUpdateDto kanbanTaskUpdateDto) {
		KanbanTask kanbanTask = findTaskById(kanbanTaskUpdateDto.getId());
		verifyMember(kanbanTask.getKanbanColumn().getSprint());
		kanbanTask.setTitle(kanbanTaskUpdateDto.getTitle());
		kanbanTask.setDescription(kanbanTaskUpdateDto.getDescription());
		kanbanTask.setEstimatedTime(kanbanTaskUpdateDto.getEstimatedTime());
		kanbanTaskRepository.save(kanbanTask);
	}

	@Transactional
	public void disableKanbanTask(Long kanbanTaskId) {
		KanbanTask kanbanTask = findTaskById(kanbanTaskId);
		verifyMember(kanbanTask.getKanbanColumn().getSprint());
		kanbanTask.setActive(false);
		kanbanTaskRepository.save(kanbanTask);
	}

//	@Transactional
//	public void reorderKanbanColumnOld(KanbanColumn kanbanColumn) {
//		List<KanbanTask> ls = kanbanColumn.getTasks().stream().filter(x -> x.getActive()).collect(Collectors.toList());
//		IntStream.range(0, ls.size()).forEach(x -> ls.get(x).setOrderInColumn((long) x - ls.size() - 1));
//	}

	private List<KanbanTask> filterActiveTask(List<KanbanTask> ls) {
		return ls.stream().filter(x -> x.getActive()).collect(Collectors.toList());
	}

	private void saveKanbanTaskOrderInColumn(KanbanTask kanbanTask, KanbanColumn kanbanColumn, Long orderInColumn) {
		kanbanTask.setOrderInColumn(orderInColumn);
		
		if(!kanbanTask.getKanbanColumn().getId().equals(kanbanColumn)) {
			kanbanTask.setKanbanColumn(kanbanColumn);
		}
		kanbanTaskRepository.save(kanbanTask);
	}

	private void reorderAndSaveKanbanTasks(List<KanbanTask> ls, KanbanColumn kanbanColumn) {
		IntStream.range(0, ls.size())
			.filter(x -> ls.get(x).getOrderInColumn().intValue() != ls.size() - x - 1)
			.forEach(x -> saveKanbanTaskOrderInColumn(ls.get(x), kanbanColumn, (long) ls.size() - x - 1));
	}

	@Transactional // if fails -> rollback
	public void moveKanbanTask(Long kanbanTaskId, Long newKanbanColumnId, Long newPosition) {
		KanbanTask kanbanTask = findTaskById(kanbanTaskId);
		KanbanColumn kanbanNewColumn = findColumnById(newKanbanColumnId);
		
		// validations
		verifyMember(kanbanNewColumn.getSprint());
		verifyMember(kanbanTask.getKanbanColumn().getSprint());
		if(!kanbanNewColumn.getSprint().getId().equals(kanbanTask.getKanbanColumn().getSprint().getId())) {
			throw new DuplicateKeyException(ImanMessages.KANBAN_NOT_CONTAINED_IN_SPRINT_MESSAGE);
		}
		
		List<KanbanTask> ls = filterActiveTask(kanbanNewColumn.getTasks());

		// change column
		if (kanbanTask.getKanbanColumn() != null && !kanbanTask.getKanbanColumn().getId().equals(newKanbanColumnId)) {
			KanbanColumn oldKanbanColumn = kanbanTask.getKanbanColumn();
			List<KanbanTask> lsOld = oldKanbanColumn.getTasks();
			lsOld.remove(kanbanTask);
			reorderAndSaveKanbanTasks(lsOld, oldKanbanColumn);
		// same column
		} else {
			ls.remove(kanbanTask);
		}
		
		ls.add(ls.size() - newPosition.intValue(), kanbanTask);
		reorderAndSaveKanbanTasks(ls, kanbanNewColumn);
	}
}
