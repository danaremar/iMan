package com.iman.model.kanban;

import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KanbanTaskMoveDto {
	
	@NotNull
	private Long kanbanTaskId;
	
	@NotNull
	private Long newKanbanColumnId;
	
	@NotNull
	private Long newPosition;
}
