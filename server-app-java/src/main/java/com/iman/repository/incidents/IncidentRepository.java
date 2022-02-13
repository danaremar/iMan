package com.iman.repository.incidents;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iman.model.incident.Incident;

public interface IncidentRepository extends JpaRepository<Incident, Long> {

}
