package com.iman.repository.kanban;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.kanban.KanbanTask;

@Repository
public interface KanbanTaskRepository extends JpaRepository<KanbanTask, Long> {

}
