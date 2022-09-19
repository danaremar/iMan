package com.iman.repository.vulns;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.vulnerability.vuln.Vuln;

@Repository
public interface VulnRepository extends JpaRepository<Vuln, Long> {

}
