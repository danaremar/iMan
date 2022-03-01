package com.iman.model.incident;

import java.util.Date;

import com.iman.model.users.UserShowDto;

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

	private Integer priority;
	
	private String status;

	private String affects;

	private UserShowDto user;

	private UserShowDto assignedUser;

}
