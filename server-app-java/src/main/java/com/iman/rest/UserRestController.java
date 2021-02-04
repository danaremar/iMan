package com.iman.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.iman.model.users.User;
import com.iman.service.users.UserService;

@RestController
public class UserRestController {

	private final UserService userService;
	
	@Autowired
	public UserRestController(final UserService userService) {
		this.userService = userService;
	}
	
	
	@GetMapping(value = "/user/{user_id}")
	public User getUserById(@PathVariable(name = "user_id") Long id) {
		return userService.findUserById(1L);
	}
	
	@GetMapping(value = "/user/count_all")
	public Long countUsersFromSystem() {
		return userService.countAllUsersFromSystem();
	}
	
	@PutMapping(value = "/user")
	public void updateUser(@PathVariable Long id) {
		userService.updateUser(null);
	}
	
	@DeleteMapping(value = "/user/{user_id}")
	public void deleteUserById(@PathVariable Long id) {
		userService.deleteUserById(id);
	}
	
	@DeleteMapping(value = "/user")
	public void deleteUser(User user) {
		userService.deleteUser(user);
	}
	
	
}
