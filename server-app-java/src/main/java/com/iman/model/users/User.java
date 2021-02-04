package com.iman.model.users;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Table;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;
import org.springframework.format.annotation.DateTimeFormat;

@Entity
@Table(name = "users", indexes = { @Index(columnList = "user"), @Index(columnList = "email"), @Index(columnList = "creation_date") })
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	
	@NotBlank
	@Column(unique = true)
	@Length(max = 15)
	private String user;
	
	@NotBlank
	@Length(max = 15)
	private String name;
	
	@NotBlank
	@Length(max = 30)
	@Column(name = "last_name")
	private String lastName;
	
	@NotBlank
	@Column(unique = true)
	@Length(max = 30)
	@Email
	private String email;
	
	@NotBlank
	@Length(max = 50)
	private String password;
	
	@NotBlank
	@Length(min = 2, max = 2)
	private String country;
	
	@NotBlank
	@Length(max = 15)
	private String sector;
	
	@NotNull
	@PastOrPresent
	@Column(name = "creation_date")
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date creationDate;
	
	@PastOrPresent
	@Column(name = "delete_date")
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date deleteDate;
	
	@NotNull
	@PastOrPresent
	@Column(name = "last_connection")
	@DateTimeFormat(pattern = "HH:mm:ss dd/MM/yyyy 'GMT'")
	private Date lastConnection;
	
	@NotNull
	private Boolean active;
	
	public User() {}

	public User(Long id, @NotBlank @Length(max = 15) String user, @NotBlank @Length(max = 15) String name,
			@NotBlank @Length(max = 30) String lastname, @NotBlank @Length(max = 30) @Email String email,
			@NotBlank @Length(max = 50) String password, @NotBlank @Length(min = 2, max = 2) String country,
			@NotBlank @Length(max = 15) String sector, @NotNull @PastOrPresent Date creationDate,
			@PastOrPresent Date deleteDate, @NotNull @PastOrPresent Date lastChange, @NotNull Boolean active) {
		super();
		this.id = id;
		this.user = user;
		this.name = name;
		this.lastName = lastname;
		this.email = email;
		this.password = password;
		this.country = country;
		this.sector = sector;
		this.creationDate = creationDate;
		this.deleteDate = deleteDate;
		this.lastConnection = lastChange;
		this.active = active;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getLastname() {
		return lastName;
	}

	public void setLastname(String lastname) {
		this.lastName = lastname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getSector() {
		return sector;
	}

	public void setSector(String sector) {
		this.sector = sector;
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

	public Date getLastChange() {
		return lastConnection;
	}

	public void setLastChange(Date lastChange) {
		this.lastConnection = lastChange;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	
}
