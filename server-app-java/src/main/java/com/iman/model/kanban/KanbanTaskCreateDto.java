package com.iman.model.kanban;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class KanbanTaskCreateDto {

	@NotBlank
	@Length(max = 50)
	private String title;

	@Length(max = 255)
	private String description;

	@Min(value = 0)
	private Double estimatedTime;

	@NotNull
	private Long kanbanColumnId;
}
