package com.iman.model.users;

import javax.persistence.Column;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserLoginDto {
	
	@NotBlank
	@Column(unique = true)
	@Length(max = 15)
	private String username;
	
	@NotBlank
	@Length(max = 50)
	private String password;

}
