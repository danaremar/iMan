package com.iman.repository.effort;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iman.model.effort.Effort;

@Repository
public interface EffortRepository extends JpaRepository<Effort, Long> {
	
	@Query("SELECT e FROM Effort e WHERE e.startDate is not null AND e.endDate is null AND e.user.id=:user_id")
	List<Effort> findLastActiveEffort(@Param("user_id") Long userId);
}
