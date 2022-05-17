package com.iman.repository.kanban;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.kanban.KanbanColumn;

@Repository
public interface KanbanColumnRepository extends JpaRepository<KanbanColumn, Long> {

}
