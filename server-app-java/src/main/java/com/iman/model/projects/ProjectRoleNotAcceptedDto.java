package com.iman.model.projects;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProjectRoleNotAcceptedDto {
	
	private Long id;

	/*
	 * ROLES : 0 -> OWNER; 1 -> ADMIN; 2 -> MEMBER; 3 -> VISITOR
	 */
	private Integer role;
	
	private String projectName;
}
