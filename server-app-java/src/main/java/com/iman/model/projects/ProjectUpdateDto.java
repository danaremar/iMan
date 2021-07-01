package com.iman.model.projects;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectUpdateDto {

	private Long id;

	@NotBlank
	@Length(max = 30)
	private String name;

	@NotBlank
	@Length(max = 255)
	private String description;

	@NotNull
	private Boolean active;

}
