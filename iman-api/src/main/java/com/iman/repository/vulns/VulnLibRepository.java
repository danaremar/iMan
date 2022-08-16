package com.iman.repository.vulns;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.vulnerability.VulnLib;

@Repository
public interface VulnLibRepository extends JpaRepository<VulnLib, Long>{
    
}
