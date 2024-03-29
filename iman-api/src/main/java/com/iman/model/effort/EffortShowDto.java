package com.iman.model.effort;

import java.util.Date;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.iman.model.kanban.KanbanTask;
import com.iman.model.projects.ProjectShowDto;
import com.iman.model.sprints.SprintShowDto;
import com.iman.model.users.UserShowDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EffortShowDto {
	
	@Autowired(required = true)
	@JsonIgnore
	protected ModelMapper modelMapper;

	private Long id;

	private String description;

	private Date startDate;

	private Date endDate;

	@JsonIgnoreProperties({ "estimatedTime", "creationDate", "active", "computedTime", "kanbanColumn"})
	private KanbanTask kanbanTask;

	private UserShowDto user;
	
	private SprintShowDto sprint;
	
	private ProjectShowDto project;

	// DERIVATED PROPERTIES

	public Double getTime() {
		if (getEndDate() != null && getStartDate() != null) {
			Long msDiff = Math.abs(getEndDate().getTime() - getStartDate().getTime());
			return ((double) msDiff / (1000 * 60 * 60)) % 24;
		} else {
			return 0.0;
		}
	}
}
