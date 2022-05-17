package com.iman.repository.incidents;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iman.model.incident.IncidentUpdate;

public interface IncidentUpdateRepository extends JpaRepository<IncidentUpdate, Long>  {

}
