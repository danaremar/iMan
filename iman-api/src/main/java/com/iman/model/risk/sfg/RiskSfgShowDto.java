package com.iman.model.risk.sfg;

import java.util.List;

import com.iman.model.risk.sfgred.RiskSfgReductionShowDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskSfgShowDto {
	
	private Long id;

	private String name;
	
	private String description;
	
	private Boolean active;
	
	private List<RiskSfgReductionShowDto> riskSfgReduction;

}
