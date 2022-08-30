package com.iman.model.risk.freq;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iman.model.projects.Project;

import lombok.Data;

@Entity
@Data
@Table(name = "risk_freq", indexes = { @Index(columnList = "name")})
public class RiskFreq {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Length(max = 50)
	private String name;
	
	@NotNull
	@Max(value = 1)
	@Min(value = 0)
	private Double quantity;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "project_id")
	@JsonIgnore
	private Project project;

}
