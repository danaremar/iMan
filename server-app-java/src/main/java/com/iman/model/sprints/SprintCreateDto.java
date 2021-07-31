package com.iman.model.sprints;

import java.util.Date;

import javax.validation.constraints.FutureOrPresent;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SprintCreateDto {

	@NotBlank
	@Length(max = 50)
	private String title;
	
	@Length(max = 255)
	private String description;
	
	@FutureOrPresent
	private Date startDate;

	@FutureOrPresent
	private Date estimatedDate;
	
	@NotNull
	private Long projectId;
}
