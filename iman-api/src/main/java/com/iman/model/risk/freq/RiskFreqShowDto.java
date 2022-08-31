package com.iman.model.risk.freq;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskFreqShowDto {
	
	private Long id;
	private String name;
	private Double quantity;

}
