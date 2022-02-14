package com.iman.model.kanban;

import java.util.Date;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.iman.model.effort.Effort;
import com.iman.model.users.User;

import lombok.Data;

@Entity
@Data
@Table(name = "kanban_task", indexes = { @Index(columnList = "title"), @Index(columnList = "number"),
		@Index(columnList = "orderInColumn"), @Index(columnList = "active"), @Index(columnList = "creationDate"),
		@Index(columnList = "importance") })
public class KanbanTask {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotBlank
	@Length(max = 50)
	private String title;

	@Length(max = 255)
	private String description;

	@Min(value = 0)
	private Double estimatedTime;

	@NotNull
	@PastOrPresent
	private Date creationDate;

	@NotNull
	@Min(value = 0)
	private Long number;

	@NotNull
	@Min(value = 0)
	private Long orderInColumn;

	private Boolean active;

	@ManyToOne
	@JoinColumn(name = "kanban_column_id")
	@JsonIgnore
	private KanbanColumn kanbanColumn;
	
	@OneToOne
	@JsonIncludeProperties({"id","username","imageUid"})
	private User creator;

	// EFFORTS

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "kanbanTask")
	@JsonIgnore
	private List<Effort> efforts;

	public Double getComputedTime() {
		return efforts.stream().mapToDouble(Effort::getTime).sum();
	}

	// GANTT

	@Length(max = 50)
	private String importance;

	private Date dueStartDate;

	private Date dueEndDate;
	
	@ManyToMany
	@JoinTable(name = "kanban_task_assignation")
	@JsonIncludeProperties({"username", "imageUid"})
	private List<User> assignedUsers;
	
	@ManyToMany
	@JoinTable(name = "kanban_task_children")
	@JsonIncludeProperties({"id", "title", "number", "active"})
	private List<KanbanTask> children;

}
