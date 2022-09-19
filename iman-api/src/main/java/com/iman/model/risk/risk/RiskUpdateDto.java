package com.iman.model.risk.risk;

import javax.validation.constraints.Min;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class RiskUpdateDto extends RiskCreateDto {
	
	@Min(value = 0)
	private Long id;

}
