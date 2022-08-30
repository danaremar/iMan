package com.iman.model.risk.freq;

import javax.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RiskFreqUpdateDto extends RiskFreqCreateDto {
	
	@Min(value = 0)
	private Long id;

}
