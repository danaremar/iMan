package com.iman.model.sprints;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
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
import com.iman.model.kanban.KanbanColumn;
import com.iman.model.projects.Project;

import lombok.Data;

@Entity
@Data
@Table(name = "sprint", indexes = {@Index(columnList ="number"), @Index(columnList ="title"), @Index(columnList ="creation_date"), @Index(columnList ="start_date"), @Index(columnList ="active"), @Index(columnList ="close_date") })
public class Sprint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Min(value = 1L)
	private Long number;

	@NotBlank
	@Length(max = 50)
	private String title;

	@Length(max = 255)
	private String description;

	@NotNull
	@PastOrPresent
	@Column(name = "creation_date")
	private Date creationDate;

	@Column(name = "start_date")
	private LocalDate startDate;

	@Column(name = "estimated_date")
	private LocalDate estimatedDate;

	@Column(name = "close_date")
	private LocalDate closeDate;

	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "project_id")
	private Project project;

	@NotNull
	private Boolean active;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "sprint")
	@JsonIgnore
	private List<KanbanColumn> kanbanColums;

}
