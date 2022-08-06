package com.iman.model.actives;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.iman.model.projects.Project;
import com.iman.model.users.User;

import lombok.Data;

@Entity
@Data
@Table(name = "active", indexes = { @Index(columnList = "code"), @Index(columnList = "active"),
		@Index(columnList = "name"), @Index(columnList = "importance"), @Index(columnList = "location") })
public class Active {

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

	@NotNull
	private Boolean active;

	@Length(max = 50)
	private String type;

	@Length(max = 50)
	private String company;

	@Length(max = 50)
	private String product;

	@Length(max = 50)
	private String version;

	@Length(max = 10)
	private String cpeType;

	@Length(max = 50)
	private String cpe;

	@Length(max = 50)
	private String importance;

	private Date startAdquisition;

	private Date endAdquisition;

	private Date endOfLife;

	@Min(value = 0)
	private Double cost;

	@Length(max = 50)
	private String periodicity;

	@Length(max = 50)
	private String subscriptionType;

	@Length(max = 50)
	private String location;

	@ManyToMany
	@JoinTable(name = "active_children")
	@JsonIncludeProperties({ "id", "code", "name", "active" })
	private List<Active> children;

	@ManyToMany
	@JoinTable(name = "active_users")
	private List<ActiveUsers> activeUsers;
	
	@NotNull
	@ManyToOne
	@JoinColumn(name = "project_id")
	@JsonIgnore
	private Project project;

}
