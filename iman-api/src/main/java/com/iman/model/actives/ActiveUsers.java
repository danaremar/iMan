package com.iman.model.actives;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;
import com.iman.model.users.User;

import lombok.Data;

@Entity
@Data
@Table(name = "active_users", indexes = { @Index(columnList = "status"), @Index(columnList = "ips") })
public class ActiveUsers {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Length(max = 50)
	private String status;
	
	@Length(max = 255)
	private String serial;
	
	@Length(max = 255)
	private String notes;
	
	@Length(max = 255)
	private String ips;
	
	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIncludeProperties({ "username", "imageUid", "active" })
	private User user;
	
}
