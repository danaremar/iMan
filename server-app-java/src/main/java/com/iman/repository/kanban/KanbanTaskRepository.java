package com.iman.repository.kanban;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iman.model.kanban.KanbanTask;

@Repository
public interface KanbanTaskRepository extends JpaRepository<KanbanTask, Long> {
	
	@Query("SELECT kt FROM KanbanTask kt WHERE kt.active=true AND kt.kanbanColumn.sprint.id=:sprint_id ORDER BY kt.number DESC")
	List<KanbanTask> findAllKanbanTaskBySprintId(@Param("sprint_id") Long sprintId);

}
