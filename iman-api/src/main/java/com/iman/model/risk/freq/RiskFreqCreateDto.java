package com.iman.model.risk.freq;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskFreqCreateDto {
	
	@NotBlank
	@Length(max = 50)
	private String name;
	
	@NotNull
	@Max(value = 1)
	@Min(value = 0)
	private Double quantity;

}
