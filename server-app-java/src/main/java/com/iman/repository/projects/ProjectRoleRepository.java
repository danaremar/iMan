package com.iman.repository.projects;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.projects.ProjectRole;

@Repository
public interface ProjectRoleRepository extends PagingAndSortingRepository<ProjectRole, Long> {

}
