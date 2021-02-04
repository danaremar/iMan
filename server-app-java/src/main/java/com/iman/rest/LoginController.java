package com.iman.rest;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iman.model.users.User;
import com.iman.service.users.UserService;

import io.swagger.annotations.Api;

@RestController
@Api( tags = "Login")
public class LoginController {

	private final UserService userService;
	
	@Autowired
	public LoginController(final UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping(value = "login")
	public String login(@RequestParam(name = "user") String username, @RequestParam(name = "password") String encryptedPassword) {
		if(userService.validatePasswordFromUsernameOrEmail(username, encryptedPassword)) {
			return "OK!";
		} else {
			return "FAILED!";
		}
	}
	
	@PostMapping(value = "register")
	public void register(User user) {
		userService.addUser(user);
	}
}
