package com.iman.model.risk.dimension;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iman.model.projects.Project;

import lombok.Data;

@Entity
@Data
@Table(name = "risk_dim", indexes = { @Index(columnList = "abbreviation"), @Index(columnList = "name") })
public class RiskDimension {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Length(max = 1)
	private String abbreviation;

	@NotBlank
	@Length(max = 50)
	private String name;
	
	@ManyToOne
	@JoinColumn(name = "project_id")
	@JsonIgnore
	private Project project;

}
