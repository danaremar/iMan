package com.iman.model.projects;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectRoleUpdateDto {
	
	@NotNull
	private Long id;

	/*
	 * ROLES : 0 -> OWNER; 1 -> ADMIN; 2 -> MEMBER; 3 -> VISITOR
	 */
	@NotNull
	@Min(value = 0)
	@Max(value = 3)
	private Integer role;
}
