package com.iman.model.projects;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

@Entity
@Table(name = "projects", indexes = {})
public class Project {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	
	public Project() {}

	public Project(Long id, @NotBlank @Length(max = 30) String name, @NotBlank @Length(max = 255) String description,
			@NotNull @PastOrPresent Date creationDate, @PastOrPresent Date deleteDate, @NotNull Boolean active) {
		super();
		this.id = id;
		this.name = name;
		this.description = description;
		this.creationDate = creationDate;
		this.deleteDate = deleteDate;
		this.active = active;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	public Date getDeleteDate() {
		return deleteDate;
	}

	public void setDeleteDate(Date deleteDate) {
		this.deleteDate = deleteDate;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	
}
