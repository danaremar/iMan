package com.iman.model.effort;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.iman.model.kanban.KanbanTask;
import com.iman.model.users.User;

import lombok.Data;

@Entity
@Data
@Table(name = "effort", indexes = {})
public class Effort {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Length(max = 255)
	private String description;

	@NotNull
	@PastOrPresent
	private Date startDate;

	private Date endDate;

	@ManyToOne
	@JoinColumn(name = "kanban_task_id")
	@JsonIgnore
	private KanbanTask kanbanTask;

	@NotNull
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnore
	private User user;

	public Double getTime() {
		if (getEndDate() != null && getStartDate() != null) {
			Long msDiff = Math.abs(getEndDate().getTime() - getStartDate().getTime());
			return ((double) msDiff / (1000 * 60 * 60)) % 24;
		} else {
			return 0.0;
		}
	}

}
