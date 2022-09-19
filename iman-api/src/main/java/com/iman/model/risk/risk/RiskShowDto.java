package com.iman.model.risk.risk;

import java.util.List;

import com.iman.model.risk.calc.RiskCalcShowDto;
import com.iman.model.risk.sfg.RiskSfgShowDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RiskShowDto extends RiskListDto {

	private List<RiskCalcShowDto> riskCalc;

	private List<RiskSfgShowDto> riskSfg;

}
