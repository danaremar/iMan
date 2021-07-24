package com.iman.repository.projects;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iman.model.projects.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

//	@Query("SELECT p FROM Project p LEFT JOIN ProjectRole pr ON pr.user.id=:user_id AND p.active=1")
	@Query("SELECT p FROM Project p LEFT JOIN ProjectRole pr ON p.id = pr.project.id where pr.user.id=:user_id")
	List<Project> findAllProjectsByUserId(@Param("user_id") Long userId);
	
}
