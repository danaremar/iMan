package com.iman.model.risk.sfgred;

import com.iman.model.risk.dimension.RiskDimensionShowDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskSfgReductionShowDto {
	
	private Long id;
	
	private Double reduction;
	
	private Double cost;
	
	private RiskDimensionShowDto riskDimension;

}
