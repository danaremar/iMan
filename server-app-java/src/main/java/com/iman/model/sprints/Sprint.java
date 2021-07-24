package com.iman.model.sprints;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.iman.model.projects.Project;

import lombok.Data;

@Entity
@Data
@Table
public class Sprint {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	@Min(value = 1)
	private Integer number;

	@NotBlank
	@Length(max = 15)
	private String description;

	@NotNull
	@PastOrPresent
	@Column(unique = true, name = "creation_date")
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date creationDate;

	@NotNull
	@PastOrPresent
	@Column(unique = true, name = "estimated_date")
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date estimatedDate;

	@PastOrPresent
	@Column(name = "final_date")
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date finalDate;

	@PastOrPresent
	@Column(name = "close_date")
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date closeDate;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "project_id")
	private Project project;

	@NotNull
	private Boolean active;

}
