package com.iman.model.sprints;

import java.util.Date;

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
	
	private Date startDate;

	private Date estimatedDate;
	
	private Date closeDate;
}
