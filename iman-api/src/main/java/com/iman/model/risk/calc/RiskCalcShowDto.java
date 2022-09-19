package com.iman.model.risk.calc;

import com.iman.model.risk.dimension.RiskDimensionShowDto;
import com.iman.model.risk.freq.RiskFreqShowDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskCalcShowDto {

	private Long id;

	private Double value;

	private Double degradation;

	private Double totalWoSfg;

	private Double total;

	private RiskFreqShowDto riskFreq;

	private RiskDimensionShowDto riskDimension;

}
