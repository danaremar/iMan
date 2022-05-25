package com.iman.model.users;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserShowDto {

	private String username;

	private String name;

	private String lastName;

	private String email;
	
	private String imageUid;
}
