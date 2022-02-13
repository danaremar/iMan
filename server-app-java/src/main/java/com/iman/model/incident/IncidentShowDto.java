package com.iman.model.incident;

import java.util.Date;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncidentShowDto {
	
	private Long id;

	private Long code;

	private String title;
	
	private String description;

	private String reported;
	
	private List<IncidentUpdateShowDto> updates;
	
	private Boolean active;
	
	private Double estimatedTime;
	
	private Date date;
	
	private Date lastModification;
	
	private Integer priority;
	
	private String affects;
	
	private String username;
	
	private String assignedUsername;

}
