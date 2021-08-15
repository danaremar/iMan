package com.iman.model.effort;

import java.util.Date;
import com.iman.model.kanban.KanbanTask;
import com.iman.model.users.UserShowDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EffortShowDto {

	private Long id;

	private String description;

	private Date startDate;

	private Date endDate;

	private KanbanTask kanbanTask;

	private UserShowDto user;

	// DERIVATED PROPERTIES

	public Double getTime() {
		Long msDiff = Math.abs(getEndDate().getTime() - getStartDate().getTime());
		return ((double) msDiff / (1000 * 60 * 60)) % 24;
	}
}
