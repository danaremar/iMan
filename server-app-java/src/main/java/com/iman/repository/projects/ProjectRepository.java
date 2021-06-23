package com.iman.repository.projects;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.projects.Project;

@Repository
public interface ProjectRepository extends JpaRepository<Project, Long> {

}
