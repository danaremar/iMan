package com.iman.repository.active;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.actives.ActiveUsers;

@Repository
public interface ActiveUsersRepository extends JpaRepository<ActiveUsers, Long> {

}
