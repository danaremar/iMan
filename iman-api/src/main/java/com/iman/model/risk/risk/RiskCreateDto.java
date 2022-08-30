package com.iman.model.risk.risk;

import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import org.hibernate.validator.constraints.Length;

import com.iman.model.risk.calc.RiskCalcUpdateDto;
import com.iman.model.risk.sfg.RiskSfgUpdateDto;
import com.iman.model.vulnerability.vuln.Vuln;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskCreateDto {
	
	@NotNull
	@Min(value = 0)
	private Long code;

	@NotBlank
	@Length(max = 50)
	private String name;
	
	@Length(max = 255)
	private String description;
	
	@Min(value = 0)
	private Long activeId;
	
	@Min(value = 0)
	private Vuln vulnId;
	
	@Length(max = 50)
	private String riskType;
	
	private List<RiskCalcUpdateDto> riskCalc;
	
	private List<RiskSfgUpdateDto> riskSfg;

}
