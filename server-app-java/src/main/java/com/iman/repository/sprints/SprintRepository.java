package com.iman.repository.sprints;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.sprints.Sprint;

@Repository
public interface SprintRepository extends JpaRepository<Sprint, Long> {

}
