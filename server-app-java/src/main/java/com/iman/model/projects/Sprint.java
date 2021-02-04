package com.iman.model.projects;

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

@Entity
@Table
public class Sprint {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
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
	@Column(name = "delete_date")
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date deleteDate;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "project_id")
	private Project project;
	
	@NotNull
	private Boolean active;
	
	public Sprint() {}

	public Sprint(Long id, @NotNull @Min(1) Integer number, @NotBlank @Length(max = 15) String description,
			@NotNull @PastOrPresent Date creationDate, @NotNull @PastOrPresent Date estimatedDate,
			@PastOrPresent Date finalDate, @PastOrPresent Date deleteDate, @NotNull Project project,
			@NotNull Boolean active) {
		super();
		this.id = id;
		this.number = number;
		this.description = description;
		this.creationDate = creationDate;
		this.estimatedDate = estimatedDate;
		this.finalDate = finalDate;
		this.deleteDate = deleteDate;
		this.project = project;
		this.active = active;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Integer getNumber() {
		return number;
	}

	public void setNumber(Integer number) {
		this.number = number;
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

	public Date getEstimatedDate() {
		return estimatedDate;
	}

	public void setEstimatedDate(Date estimatedDate) {
		this.estimatedDate = estimatedDate;
	}

	public Date getFinalDate() {
		return finalDate;
	}

	public void setFinalDate(Date finalDate) {
		this.finalDate = finalDate;
	}

	public Date getDeleteDate() {
		return deleteDate;
	}

	public void setDeleteDate(Date deleteDate) {
		this.deleteDate = deleteDate;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	
}
