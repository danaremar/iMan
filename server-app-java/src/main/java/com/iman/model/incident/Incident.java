package com.iman.model.incident;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iman.model.projects.Project;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode(callSuper = true)
@Table(name = "incident", indexes = { @Index(columnList = "code"), @Index(columnList = "title"),
		@Index(columnList = "reported"), @Index(columnList = "estimatedTime"), @Index(columnList = "affects"),
		@Index(columnList = "priority"), @Index(columnList = "status") })
public class Incident extends IncidentGeneralStatus {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Min(value = 0)
	private Long code;

	@NotBlank
	@Length(max = 50)
	private String title;

	@Length(max = 50)
	private String reported;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "incident")
	@OrderBy("date ASC")
	private List<IncidentUpdate> updates;
	
	@NotNull
	private Boolean active;
	
	@NotNull
	@PastOrPresent
	private Date lastModification;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "project_id")
	@JsonIgnore
	private Project project;
	
}
