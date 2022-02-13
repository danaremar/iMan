package com.iman.model.incident;

import java.util.Date;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncidentUpdateShowDto {

private Boolean active;

	private Long id;

	private String description;
	
	private Double estimatedTime;
	
	private Date date;
	
	private Date lastModification;
	
	private Integer priority;
	
	private String affects;
	
	private String username;
	
	private String assignedUsername;
	
}
