package com.iman.model.kanban;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KanbanColumnShowDto {
	
	private Long id;
	
	private String title;
	
	private Long columnOrder;
	
	private List<KanbanTask> tasks;

}
