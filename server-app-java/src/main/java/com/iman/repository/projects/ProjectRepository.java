package com.iman.repository.projects;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.projects.Project;

@Repository
public interface ProjectRepository extends PagingAndSortingRepository<Project, Long> {

}
