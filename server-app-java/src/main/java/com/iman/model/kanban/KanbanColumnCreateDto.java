package com.iman.model.kanban;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KanbanColumnCreateDto {
	
	@NotBlank
	@Length(max = 50)
	private String title;
	
	@NotNull
	private Long sprintId;

}
