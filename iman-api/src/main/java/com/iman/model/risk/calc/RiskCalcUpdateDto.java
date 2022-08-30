package com.iman.model.risk.calc;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskCalcUpdateDto {
	
	@Min(value = 0)
	private Long id;
	
	@NotNull
	@Min(value = 0)
	private Double value;
	
	@NotNull
	@Min(value = 0)
	private Double degradation;
	
	@Min(value = 0)
	private Long riskFreqId;
	
	@Min(value = 0)
	private Long riskDimensionId;

}
