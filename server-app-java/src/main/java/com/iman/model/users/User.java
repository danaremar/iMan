package com.iman.model.users;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iman.model.effort.Effort;
import com.iman.model.projects.ProjectRole;

import lombok.Data;

@Entity
@Data
@Table(name = "users", indexes = { @Index(columnList = "username"), @Index(columnList = "email"),
		@Index(columnList = "creation_date") })
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Column(unique = true)
	@Length(max = 15)
	private String username;

	@NotBlank
	@Length(max = 20)
	private String name;

	@NotBlank
	@Length(max = 50)
	@Column(name = "last_name")
	private String lastName;

	@Column(unique = true, nullable = false)
	@Length(max = 50)
	@Email
	private String email;

	@JsonIgnore
	@NotBlank
	@Length(max = 256)
	private String password;

	@NotBlank
	@Length(min = 2, max = 2)
	private String country;

	@NotBlank
	@Length(max = 20)
	private String sector;

	@JsonIgnore
	@PastOrPresent
	@Column(name = "creation_date", nullable = false)
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date creationDate;

	@JsonIgnore
	@PastOrPresent
	@Column(name = "delete_date")
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date deleteDate;

	@PastOrPresent
	@Column(name = "last_connection", nullable = false)
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date lastConnection;

	@JsonIgnore
	@Column(nullable = false)
	private Boolean active;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<ProjectRole> projectRoles;
	
	@JsonIgnore
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private List<Effort> efforts;
	
}
