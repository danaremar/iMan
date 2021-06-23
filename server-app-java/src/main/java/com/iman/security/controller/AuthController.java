package com.iman.security.controller;

import java.util.Collections;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.iman.exceptions.users.DuplicatedEmail;
import com.iman.exceptions.users.DuplicatedUsername;
import com.iman.model.users.User;
import com.iman.model.users.UserCreateDto;
import com.iman.model.users.UserLoginDto;
import com.iman.security.exception.UnverifiedUserException;
import com.iman.security.jwt.JwtDto;
import com.iman.security.jwt.JwtProvider;
import com.iman.service.users.UserService;

import io.swagger.annotations.Api;

@RestController
@Api(tags = "Login")
@RequestMapping
@CrossOrigin
public class AuthController {

	@Autowired
	UserService userService;
	
	@Autowired(required=true)
	protected ModelMapper modelMapper;
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Autowired
	private JwtProvider jwtProvider;

	@Autowired
	public AuthController(final UserService userService) {
		this.userService = userService;
	}

	@PostMapping(value = "/login")
	public ResponseEntity<Object> login(@RequestBody @Valid UserLoginDto userDto) {
		
		Authentication authentication;
		
		try {
			authentication = this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					userDto.getUsername(), userDto.getPassword(), Collections.emptyList()));
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

	@PostMapping(value = "/register")
	public ResponseEntity<Object> register(@RequestBody @Valid UserCreateDto userDto) {
		User user = modelMapper.map(userDto, User.class);
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
