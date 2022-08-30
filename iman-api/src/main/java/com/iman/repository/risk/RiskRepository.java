package com.iman.repository.risk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.risk.risk.Risk;

@Repository
public interface RiskRepository extends JpaRepository<Risk, Long>{

}
