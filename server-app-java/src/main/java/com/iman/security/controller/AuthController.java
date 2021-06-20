package com.iman.security.controller;

import java.util.Collections;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.iman.exceptions.users.DuplicatedEmail;
import com.iman.exceptions.users.DuplicatedUsername;
import com.iman.model.users.User;
import com.iman.security.exception.UnverifiedUserException;
import com.iman.security.jwt.JwtDto;
import com.iman.security.jwt.JwtProvider;
import com.iman.service.users.UserService;

import io.swagger.annotations.Api;

@RestController
@Api(tags = "Login")
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

	@Autowired
	UserService userService;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	public AuthController(final UserService userService) {
		this.userService = userService;
	}

	@PostMapping(value = "/login")
	public ResponseEntity<Object> login(@RequestParam String username,
			@RequestParam(name = "password") String password) {
		
		Authentication authentication;
		
		try {
			authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					username, password, Collections.emptyList()));
		} catch (AuthenticationException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("User or password is invalid");
		} catch (UnverifiedUserException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("No verified");
		}
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		String jwt = this.jwtProvider.generateToken(authentication);

		UserDetails userDetails = (UserDetails) authentication.getPrincipal();

		JwtDto jwtDto = new JwtDto(jwt, userDetails.getUsername(), userDetails.getAuthorities());
		return new ResponseEntity<>(jwtDto, HttpStatus.CREATED);
	}

	@PostMapping(value = "/new")
	public ResponseEntity<Object> register(@RequestBody @Valid User user) {
		try {
			userService.addUser(user);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (DuplicatedUsername e) {
			String message = "Username is duplicated";
			return new ResponseEntity<>(message, HttpStatus.CONFLICT);
		} catch (DuplicatedEmail e) {
			String message = "Email is duplicated";
			return new ResponseEntity<>(message, HttpStatus.CONFLICT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
}
