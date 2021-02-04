package com.iman.model.projects;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.iman.model.users.User;

@Entity
@Table(name = "project2role")
public class ProjectRole {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id")
	private User user;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "project_id")
	private Project project;
	
	/*
	ROLES :
		0 -> OWNER
		1 -> ADMIN
		2 -> MEMBER
		3 -> VISITOR
	*/
	@NotNull
	@Min(value = 0)
	@Max(value = 3)
	private Integer role;
	
	public ProjectRole() {}

	public ProjectRole(Long id, @NotNull User user, @NotNull Project project, @NotNull @Min(0) @Max(3) Integer role) {
		super();
		this.id = id;
		this.user = user;
		this.project = project;
		this.role = role;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

	public Project getProject() {
		return project;
	}

	public void setProject(Project project) {
		this.project = project;
	}

	public Integer getRole() {
		return role;
	}

	public void setRole(Integer role) {
		this.role = role;
	}
}
