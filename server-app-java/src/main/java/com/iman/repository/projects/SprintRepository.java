package com.iman.repository.projects;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.projects.Sprint;

@Repository
public interface SprintRepository extends PagingAndSortingRepository<Sprint, Long> {

}
