package com.iman.model.kanban;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OrderBy;
import javax.persistence.Table;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.annotations.Where;
import org.hibernate.validator.constraints.Length;

import com.iman.model.sprints.Sprint;

import lombok.Data;

@Entity
@Data
@Table(name = "kanban_column", indexes = {})
public class KanbanColumn {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@NotBlank
	@Length(max = 50)
	private String title;
	
	@NotNull
	@Min(value = 0)
	private Long columnOrder;
	
	@NotNull
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "sprint_id")
	private Sprint sprint;
	
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "kanbanColumn")
	@OrderBy("orderInColumn DESC")
	@Where(clause = "active = true")
	private List<KanbanTask> tasks;
	
	private Boolean active;

}
