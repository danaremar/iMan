package com.iman.model.projects;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Entity
@Data
@Table(name = "projects", indexes = {})
public class Project {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Length(max = 30)
	private String name;

	@NotBlank
	@Length(max = 255)
	private String description;

	@NotNull
	@PastOrPresent
	@Column(name = "creation_date")
	private Date creationDate;

	@PastOrPresent
	@Column(name = "delete_date")
	private Date deleteDate;

	@NotNull
	private Boolean active;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "project")
	private List<ProjectRole> projectRoles;

}
