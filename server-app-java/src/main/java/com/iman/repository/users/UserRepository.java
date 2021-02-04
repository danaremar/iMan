package com.iman.repository.users;

import java.util.Optional;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.iman.model.users.User;

@Repository
public interface UserRepository extends PagingAndSortingRepository<User, Long> {
	
	@Override
	@Query("SELECT u FROM User u WHERE u.active=true AND u.id=:id")
	Optional<User> findById(@Param("id") Long id);
	
	@Query("SELECT u FROM User u WHERE u.active=1 AND u.user=:username")
	Optional<User> findByUsername(@Param("username") String username);
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.active=1 AND u.password=:password AND (u.user=:username OR u.email=:username)")
	Integer validatePasswordFromUsernameOrEmail(@Param("username") String username, @Param("password") String password);
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.active=1 AND u.user=:username AND u.password=:password")
	Integer validatePasswordFromUsername(@Param("username") String username, @Param("password") String password);
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.active=1 AND u.email=:email AND u.password=:password")
	Integer validatePasswordFromEmail(@Param("email") String email, @Param("password") String password);
	
	@Query("SELECT COUNT(u) FROM User u WHERE u.active=1")
	Long countActiveUsers();
	
}
