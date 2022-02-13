package com.iman.model.incident;

import java.util.Date;

import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import com.iman.model.users.User;

import lombok.Data;

@Data
@MappedSuperclass
public class IncidentGeneralStatus {

	@Length(max = 255)
	private String description;
	
	@NotNull
	@PastOrPresent
	private Date date;

	@Min(value = 0)
	private Double estimatedTime;

	@Length(max = 50)
	private String affects;

	/*
	 * PRIORITY: 0 -> VERY HIGH, 1 -> HIGH, 2 -> MEDIUM, 3 -> LOW, 4 -> VERY LOW
	 */
	@Min(value = 0)
	@Max(value = 4)
	private Integer priority;

	@Length(max = 50)
	private String status;

	@NotNull
	@ManyToOne
	private User user;

	@ManyToOne
	private User assignedUser;

}
