package com.iman.model.projects;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectRoleCreateDto {
	
	@NotNull
	private Long projectId;
	
	@NotBlank
	private String username;

	/*
	 * ROLES : 0 -> OWNER; 1 -> ADMIN; 2 -> MEMBER; 3 -> VISITOR
	 */
	@Min(value = 0)
	@Max(value = 3)
	private Integer role;
}
