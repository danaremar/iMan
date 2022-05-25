package com.iman.model.sprints;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SprintShowDto {
	
	private Long id;

	private String title;
	
	private Long number;
	
	private String description;
	
	private LocalDate startDate;

	private LocalDate estimatedDate;
	
	private LocalDate closeDate;
}
