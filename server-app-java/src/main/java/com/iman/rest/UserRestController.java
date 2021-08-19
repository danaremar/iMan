package com.iman.rest;

import javax.validation.Valid;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.iman.config.ImanMessages;
import com.iman.exceptions.users.DuplicatedEmail;
import com.iman.exceptions.users.DuplicatedUsername;
import com.iman.exceptions.users.UserNotFound;
import com.iman.model.users.User;
import com.iman.model.users.UserMyProfileDto;
import com.iman.model.users.UserShowDto;
import com.iman.model.users.UserUpdateDto;
import com.iman.model.util.Message;
import com.iman.service.users.UserService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/profile")
@Api(tags = "Users")
@CrossOrigin
public class UserRestController {

	@Autowired
	UserService userService;

	@Autowired(required = true)
	protected ModelMapper modelMapper;

	@Autowired
	public UserRestController(final UserService userService) {
		this.userService = userService;
	}

	private ResponseEntity<Object> userNotFoundResponse() {
		return new ResponseEntity<>(new Message(ImanMessages.USER_NOT_FOUND_MESSAGE), HttpStatus.NOT_FOUND);
	}

	@GetMapping(value = "/{user_username}")
	public ResponseEntity<Object> getUserByUsername(@PathVariable(name = "user_username") String username) {
		try {
			User user = userService.findUserByUsername(username);
			UserShowDto userShowDto = modelMapper.map(user, UserShowDto.class);
			if (user != null) {
				return new ResponseEntity<>(userShowDto, HttpStatus.OK);
			} else {
				return userNotFoundResponse();
			}
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping(value = "/count_all")
	public ResponseEntity<Object> countUsersFromSystem() {
		try {
			Long userNumber = userService.countAllUsersFromSystem();
			return new ResponseEntity<>(userNumber, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping
	public ResponseEntity<Object> updateUser(@RequestBody @Valid UserUpdateDto userUpdateDto) {
		try {
			userService.updateUser(userUpdateDto);
			return new ResponseEntity<>(HttpStatus.OK);
		} catch (UserNotFound e) {
			return userNotFoundResponse();
		} catch (DuplicatedEmail e) {
			return new ResponseEntity<>(new Message(ImanMessages.USER_DUPLICATED_EMAIL_MESSAGE), HttpStatus.CONFLICT);
		} catch (DuplicatedUsername e) {
			return new ResponseEntity<>(new Message(ImanMessages.USER_USERNAME_DUPLICATED_MESSAGE), HttpStatus.CONFLICT);
		} catch (AuthenticationException e) {
			return new ResponseEntity<>(new Message(e.getMessage()), HttpStatus.CONFLICT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@DeleteMapping
	public ResponseEntity<Object> deleteUserById() {
		try {
			userService.deleteUserById();
			return new ResponseEntity<>(new Message(ImanMessages.USER_DISABLED_MESSAGE), HttpStatus.OK);
		} catch (UserNotFound e) {
			return new ResponseEntity<>(new Message(ImanMessages.USER_NOT_FOUND_MESSAGE), HttpStatus.NOT_FOUND);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping
	public ResponseEntity<Object> getMyProfile() {
		User user = userService.findUserByUsername(userService.getCurrentUsername());
		if(user!=null) {
			UserMyProfileDto userMyProfileDto = modelMapper.map(user, UserMyProfileDto.class);
			return new ResponseEntity<>(userMyProfileDto, HttpStatus.OK);
		} else {
			return userNotFoundResponse();
		}
	}
}
