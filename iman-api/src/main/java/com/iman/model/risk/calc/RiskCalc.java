package com.iman.model.risk.calc;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iman.model.risk.dimension.RiskDimension;
import com.iman.model.risk.freq.RiskFreq;
import lombok.Data;

@Entity
@Data
@Table(name = "risk_calc")
public class RiskCalc {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Min(value = 0)
	private Double value;
	
	@NotNull
	@Min(value = 0)
	private Double degradation;
	
	@NotNull
	@Min(value = 0)
	private Double totalWoSfg;
	
	@NotNull
	@Min(value = 0)
	private Double total;
	
	@OneToOne
	@JoinColumn(name = "risk_freq_id")
	@JsonIgnore
	private RiskFreq riskFreq;
	
	@OneToOne
	@JoinColumn(name = "risk_dim_id")
	@JsonIgnore
	private RiskDimension riskDimension;

}
