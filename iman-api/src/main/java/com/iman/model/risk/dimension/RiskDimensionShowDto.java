package com.iman.model.risk.dimension;

import com.iman.model.projects.Project;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskDimensionShowDto {
	
	private Long id;

	private String abbreviation;

	private String name;
	
	private Project project;

}
