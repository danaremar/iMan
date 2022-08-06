package com.iman.model.actives;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActiveUsersUpdateDto {
	
	@NotNull
	private Long id;
	
	@Length(max = 50)
	private String status;
	
	@Length(max = 255)
	private String serial;
	
	@Length(max = 255)
	private String notes;
	
	@Length(max = 255)
	private String ips;
	
	@NotBlank
	@Length(max = 50)
	private String username;
	
}
