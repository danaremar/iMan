package com.iman.model.risk.sfgred;

import javax.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskSfgReductionUpdateDto {
	
	@Min(value = 0)
	private Long id;
	
	@Min(value = 0)
	private Double reduction;
	
	@Min(value = 0)
	private Double cost;
	
	@Min(value = 0)
	private Long riskDimensionId;

}
