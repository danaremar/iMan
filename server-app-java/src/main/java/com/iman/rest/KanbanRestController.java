package com.iman.rest;

import java.util.List;
import java.util.stream.Collectors;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iman.model.kanban.KanbanColumn;
import com.iman.model.kanban.KanbanColumnCreateDto;
import com.iman.model.kanban.KanbanColumnShowDto;
import com.iman.model.kanban.KanbanColumnUpdateDto;
import com.iman.model.kanban.KanbanTask;
import com.iman.model.kanban.KanbanTaskCreateDto;
import com.iman.model.kanban.KanbanTaskMoveDto;
import com.iman.model.kanban.KanbanTaskUpdateDto;
import com.iman.model.util.Message;
import com.iman.service.kanban.KanbanService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/kanban")
@Api(tags = "Kanban")
@CrossOrigin
public class KanbanRestController {

	@Autowired
	KanbanService kanbanService;
	
	@Autowired(required = true)
	protected ModelMapper modelMapper;
	
	public KanbanRestController(KanbanService kanbanService, ModelMapper modelMapper) {
		this.kanbanService = kanbanService;
		this.modelMapper = modelMapper;
	}
	
	/*
	 * 
	 * COLUMNS
	 * 
	 */

	@GetMapping(value = "/sprint/{sprintId}")
	public ResponseEntity<Object> getKanbansBySprintId(@PathVariable Long sprintId) {
		try {
			List<KanbanColumn> kanbanColums = kanbanService.findKanbanColumnsBySprintId(sprintId);
			List<KanbanColumnShowDto> kanbanColumnShowList = kanbanColums.stream().map(x -> modelMapper.map(x, KanbanColumnShowDto.class))
					.collect(Collectors.toList());
			return new ResponseEntity<>(kanbanColumnShowList, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping(value = "/column")
	public ResponseEntity<Object> createKanbanColumn(@RequestBody @Valid KanbanColumnCreateDto kanbanColumnCreateDto) {
		try {
			kanbanService.createKanbanColumn(kanbanColumnCreateDto);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping(value = "/column")
	public ResponseEntity<Object> updateKanbanColumn(@RequestBody @Valid KanbanColumnUpdateDto kanbanColumnUpdateDto) {
		try {
			kanbanService.updateKanbanColumn(kanbanColumnUpdateDto);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping(value = "/column/{columnId}/disable")
	public ResponseEntity<Object> disableKanbanColumn(@PathVariable Long columnId) {
		try {
			kanbanService.disableKanbanColumn(columnId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	
	/*
	 * 
	 * TASKS
	 * 
	 */
	
	@GetMapping(value = "/task/sprint/{sprintId}")
	public ResponseEntity<Object> getKanbanTasksBySprintId(@PathVariable Long sprintId) {
		try {
			List<KanbanTask> kanbanTasks = kanbanService.findKanbanTasksBySprintId(sprintId);
			return new ResponseEntity<>(kanbanTasks, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PostMapping(value = "/task")
	public ResponseEntity<Object> createKanbanTask(@RequestBody @Valid KanbanTaskCreateDto kanbanTaskCreateDto) {
		try {
			KanbanTask kanbanTask = kanbanService.createKanbanTask(kanbanTaskCreateDto);
			return new ResponseEntity<>(kanbanTask,HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping(value = "/task")
	public ResponseEntity<Object> updateKanbanTask(@RequestBody @Valid KanbanTaskUpdateDto kanbanTaskUpdateDto) {
		try {
			KanbanTask kanbanTask = kanbanService.updateKanbanTask(kanbanTaskUpdateDto);
			return new ResponseEntity<>(kanbanTask,HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping(value = "/task/{taskId}/disable")
	public ResponseEntity<Object> disableKanbanTask(@PathVariable Long taskId) {
		try {
			kanbanService.disableKanbanTask(taskId);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	
	@PutMapping(value = "/task/move")
	public ResponseEntity<Object> moveKanbanTask(@RequestBody @Valid KanbanTaskMoveDto kanbanTaskMoveDto) {
		try {
			kanbanService.moveKanbanTask(kanbanTaskMoveDto.getKanbanTaskId(), kanbanTaskMoveDto.getNewKanbanColumnId(), kanbanTaskMoveDto.getNewPosition());
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		}
	}
	

}
