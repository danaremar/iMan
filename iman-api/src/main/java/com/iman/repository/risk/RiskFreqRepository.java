package com.iman.repository.risk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.risk.freq.RiskFreq;

@Repository
public interface RiskFreqRepository extends JpaRepository<RiskFreq, Long>{

}
