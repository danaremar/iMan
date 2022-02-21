package com.iman.model.incident;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncidentUpdateCreateDto {
	
	@Length(max = 255)
	private String description;

	@Min(value = 0)
	private Double estimatedTime;

	@Length(max = 50)
	private String affects;

	/*
	 * PRIORITY: 0 -> CRITICAL, 1 -> HIGH, 2 -> MEDIUM, 3 -> LOW
	 */
	@Min(value = 0)
	@Max(value = 3)
	private Integer priority;

	@Length(max = 50)
	private String status;

	@Length(max = 15)
	private String assignedUsername;
	

}
