package com.iman.model.effort;

import java.util.Date;

import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class EffortUpdateDto {
	
	private Long id;
	
	@Length(max = 255)
	private String description;
	
	private Long kanbanTaskId;
	
	@PastOrPresent
	private Date startDate;
	
	private Date endDate;
	
}
