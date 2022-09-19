package com.iman.model.risk.dimension;

import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskDimensionCreateDto {
	
	@NotBlank
	@Length(max = 1)
	private String abbreviation;

	@NotBlank
	@Length(max = 50)
	private String name;

}
