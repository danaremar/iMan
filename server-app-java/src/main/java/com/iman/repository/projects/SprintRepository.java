package com.iman.repository.projects;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.sprint.Sprint;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Long> {

}
