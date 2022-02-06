package com.iman.model.incident;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class IncidentUpdateDto {
	
	@NotNull
	private Long id;
	
	@NotBlank
	@Length(max = 50)
	private String title;
	
	@Length(max = 255)
	private String description;
	
	@Length(max = 50)
	private String reported;

}
