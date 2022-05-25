package com.iman.repository.projects;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.projects.ProjectRole;

@Repository
public interface ProjectRoleRepository extends JpaRepository<ProjectRole, Long> {
	
}
