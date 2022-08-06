package com.iman.repository.active;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.actives.Active;

@Repository
public interface ActiveRepository extends JpaRepository<Active, Long> {

}
