package com.iman.repository.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iman.model.users.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	
	@Override
	@Query("SELECT u FROM User u WHERE u.active=true AND u.id=:id")
	Optional<User> findById(@Param("id") Long id);
	
	@Query("SELECT u FROM User u WHERE u.active=true AND u.username=:username")
	Optional<User> findByUsername(@Param("username") String username);
	
	@Query("SELECT u FROM User u WHERE u.active=true AND u.email=:email")
	Optional<User> findByEmail(@Param("email") String email);
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.active=true")
	Long countActiveUsers();
	
}
