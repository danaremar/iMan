package com.iman.model.effort;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EffortStartDto {
	
	@Length(max = 255)
	private String description;
	
	private Long kanbanTaskId;
	
}
