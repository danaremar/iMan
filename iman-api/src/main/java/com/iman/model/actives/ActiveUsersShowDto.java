package com.iman.model.actives;

import com.iman.model.users.UserShowDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActiveUsersShowDto {

	private Long id;
	
	private String status;
	
	private String serial;
	
	private String notes;
	
	private String ips;
	
	private UserShowDto user;
	
}
