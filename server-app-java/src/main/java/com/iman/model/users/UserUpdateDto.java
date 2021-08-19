package com.iman.model.users;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserUpdateDto {

	@NotBlank
	@Length(max = 15)
	private String username;

	@NotBlank
	@Length(max = 20)
	private String name;

	@NotBlank
	@Length(max = 50)
	@Column(name = "last_name")
	private String lastName;

	@Column(unique = true, nullable = false)
	@Length(max = 50)
	@Email
	private String email;
	
	@NotBlank
	@Length(max = 50)
	private String oldPassword;

	@NotBlank
	@Length(max = 50)
	private String newPassword;

	@NotBlank
	@Length(min = 2, max = 2)
	private String country;
	
	@NotBlank
	@Length(max = 20)
	private String sector;
	
}
