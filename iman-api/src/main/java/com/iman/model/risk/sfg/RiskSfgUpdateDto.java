package com.iman.model.risk.sfg;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.FetchType;
import javax.persistence.OneToMany;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.iman.model.risk.sfgred.RiskSfgReductionUpdateDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskSfgUpdateDto {

	@Min(value = 0)
	private Long id;

	@NotBlank
	@Length(max = 50)
	private String name;
	
	@NotBlank
	@Length(max = 255)
	private String description;
	
	@NotNull
	private Boolean active;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "riskSfg", cascade = CascadeType.ALL)
	private List<RiskSfgReductionUpdateDto> riskSfgReduction;
	
}
