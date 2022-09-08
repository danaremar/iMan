package com.iman.model.risk.sfgred;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iman.model.risk.dimension.RiskDimension;
import lombok.Data;

@Entity
@Data
@Table(name = "risk_sfg_reduction")
public class RiskSfgReduction {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Min(value = 0)
	private Double reduction;
	
	@Min(value = 0)
	private Double cost;
	
	@OneToOne
	@JoinColumn(name="risk_dim_id")
	@JsonIgnore
	private RiskDimension riskDimension;

}
