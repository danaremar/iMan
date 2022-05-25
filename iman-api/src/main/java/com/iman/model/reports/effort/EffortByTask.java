package com.iman.model.reports.effort;

import com.iman.model.kanban.KanbanTask;

import lombok.Data;

@Data
public class EffortByTask {
	
	private KanbanTask kanbanTask;
	
	private Double computedEffort;
	
	private Double estimedEffort;
	
	private Double percentageEffort;

}
