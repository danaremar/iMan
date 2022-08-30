package com.iman.model.risk.risk;

import java.util.Date;
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
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iman.model.actives.Active;
import com.iman.model.projects.Project;
import com.iman.model.risk.calc.RiskCalc;
import com.iman.model.risk.sfg.RiskSfg;
import com.iman.model.users.User;
import com.iman.model.vulnerability.vuln.Vuln;

import lombok.Data;

@Entity
@Data
@Table(name = "risk", indexes = { @Index(columnList = "code"), @Index(columnList = "name") })
public class Risk {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotNull
	@Min(value = 0)
	private Long code;

	@NotBlank
	@Length(max = 50)
	private String name;
	
	@Length(max = 255)
	private String description;
	
	@NotNull
	@PastOrPresent
	private Date creationDate;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "created_by_user_id")
	@JsonIgnore
	private User createdBy;

	@NotNull
	@PastOrPresent
	private Date lastModification;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "modified_by_user_id")
	@JsonIgnore
	private User modifiedBy;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="active_id")
	@JsonIgnore
	private Active assignedActive;
	
	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name="vuln_id")
	@JsonIgnore
	private Vuln assignedVuln;
	
	@NotNull
	private Boolean active;
	
	@Length(max = 50)
	private String riskType;
	
	@Min(value = 0)
	private Double totalWoSfg;
	
	@Min(value = 0)
	private Double total;
	
	@ManyToOne
	@JoinColumn(name = "project_id")
	@JsonIgnore
	private Project project;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "risk", cascade = CascadeType.ALL)
	private List<RiskCalc> riskCalc;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "risk", cascade = CascadeType.ALL)
	private List<RiskSfg> riskSfg;
	

}
