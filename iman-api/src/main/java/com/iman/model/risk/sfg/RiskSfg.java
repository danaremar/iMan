package com.iman.model.risk.sfg;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iman.model.risk.risk.Risk;
import com.iman.model.risk.sfgred.RiskSfgReduction;

import lombok.Data;

@Entity
@Data
@Table(name = "risk_sfg", indexes = { @Index(columnList = "name") })
public class RiskSfg {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Length(max = 50)
	private String name;
	
	@NotBlank
	@Length(max = 255)
	private String description;
	
	@NotNull
	private Boolean active;
	
	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "risk_id")
	private Risk risk;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "riskSfg", cascade = CascadeType.ALL)
	private List<RiskSfgReduction> riskSfgReduction;

}
