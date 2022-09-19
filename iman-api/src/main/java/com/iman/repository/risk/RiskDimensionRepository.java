package com.iman.repository.risk;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.risk.dimension.RiskDimension;

@Repository
public interface RiskDimensionRepository extends JpaRepository<RiskDimension, Long>{

}
