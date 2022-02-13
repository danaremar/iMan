package com.iman.model.incident;

import java.util.Date;

import javax.validation.constraints.Min;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncidentSearch {
	
	private Long id;
	
	@Min(value = 0)
	private Long code;
	
	@Length(max = 50)
	private String title;
	
	@Length(max = 255)
	private String description;
	
	@Length(max = 50)
	private String reported;
	
	private Boolean active;
	
	@PastOrPresent
	private Date date;
	
	@PastOrPresent
	private Date lastModification;
	
	@Min(value = 0)
	private Double estimatedTime;

	@Length(max = 50)
	private String affects;
	
	@Length(max = 15)
	private String username;
	
	@Length(max = 15)
	private String assignedUsername;
	
}
