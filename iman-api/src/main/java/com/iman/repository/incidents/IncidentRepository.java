package com.iman.repository.incidents;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.incident.Incident;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {

}
