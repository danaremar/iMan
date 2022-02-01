package com.iman.service.users;

import java.io.IOException;
import java.util.Collections;
import java.util.Date;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import com.iman.exceptions.users.DuplicatedEmail;
import com.iman.exceptions.users.DuplicatedUsername;
import com.iman.exceptions.users.IncorrectPassword;
import com.iman.exceptions.users.UserNotFound;
import com.iman.model.users.User;
import com.iman.model.users.UserUpdateDto;
import com.iman.model.util.FileUtils;
import com.iman.repository.users.UserRepository;
import com.iman.security.exception.UnverifiedUserException;
import com.iman.security.user.PrincipalUser;


@Service
public class UserService {

	private UserRepository userRepository;
	
	@Lazy
	@Autowired
	PasswordEncoder passwordEncoder;
	
	@Lazy
	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	@Transactional
	public User findUserById(Long id) {
		return userRepository.findById(id).orElse(null);
	}

	@Transactional
	public User findUserByUsername(String username) {
		return userRepository.findByUsername(username).orElse(null);
	}

	public User findUserByEmail(String email) {
		return userRepository.findByEmail(email).orElse(null);
	}

	@Transactional
	public Long countAllUsersFromSystem() {
		return userRepository.countActiveUsers();
	}

	@Transactional
	public void addUser(User user) throws DuplicatedUsername, DuplicatedEmail {
		if (findUserByUsername(user.getUsername()) != null) {
			throw new DuplicatedUsername();
		}
		if (findUserByEmail(user.getEmail()) != null) {
			throw new DuplicatedEmail();
		}
		user.setPassword(this.passwordEncoder.encode(user.getPassword()));
		user.setActive(true);
		user.setCreationDate(new Date());
		user.setLastConnection(new Date());
		userRepository.save(user);
	}

	@Transactional
	public void updateUser(UserUpdateDto user) throws UserNotFound, DuplicatedEmail, DuplicatedUsername, AuthenticationException, IncorrectPassword {
		String username = getCurrentUsername();
		User userBefore = findUserByUsername(username);
		
		if (userBefore == null) {
			throw new UserNotFound();
		}
		if (!user.getUsername().equals(userBefore.getUsername()) && findUserByUsername(user.getUsername()) != null) {
			throw new DuplicatedUsername();
		}
		if (!user.getEmail().equals(userBefore.getEmail()) && findUserByEmail(user.getEmail()) != null) {
			throw new DuplicatedEmail();
		}
		
		// verify password
		try {
			this.authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
					username, user.getOldPassword(), Collections.emptyList()));
		} catch (AuthenticationException e) {
			throw new IncorrectPassword();
		} catch (UnverifiedUserException e) {
			throw new UserNotFound();
		}
		
		
		userBefore.setUsername(user.getUsername());
		userBefore.setName(user.getName());
		userBefore.setLastName(user.getLastName());
		userBefore.setEmail(user.getEmail());
		if(user.getNewPassword()!=null && user.getNewPassword().length()!=0) {
			String newCypheredPassword = this.passwordEncoder.encode(user.getNewPassword());
			userBefore.setPassword(newCypheredPassword);
		}
		userBefore.setCountry(user.getCountry());
		userBefore.setSector(user.getSector());
		userBefore.setLastConnection(new Date());
		
		userRepository.save(userBefore);
	}

	@Transactional
	public void deleteUserById() throws UserNotFound {
		User user = getCurrentUser();
		if (user == null) {
			throw new UserNotFound();
		}
		user.setLastConnection(new Date());
		user.setDeleteDate(new Date());
		user.setActive(false);
		userRepository.save(user);
	}
	
	public String getCurrentUsername() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return authentication.getName();
	}
	
	public Long getCurrentUserId() {
		Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
		return ((PrincipalUser)authentication.getPrincipal()).getId();
	}
	
	@Transactional
	public User getCurrentUser() {
		return findUserById(getCurrentUserId());
	}
	
	@Transactional
	public void uploadImage(MultipartFile image) {
		User user = getCurrentUser();
		String path = FileUtils.imagesPath;
		
		// delete from path previous image
		if(StringUtils.isNotBlank(user.getImageUid())) {
			deleteImage(path, user);
		}
		
		// create new image & update
		String newImageUid = FileUtils.getFileNameUID(image);
		try {
			FileUtils.uploadToPath(image, path, newImageUid);
			user.setImageUid(newImageUid);
			userRepository.save(user);
		} catch (IOException e) {
			throw new RuntimeException();
		}		
	}
	
	@Transactional
	public void deleteImage() {
		String path = FileUtils.imagesPath;
		deleteImage(path, getCurrentUser());
	}
	
	@Transactional
	public void deleteImage(String path, User user) {
		try {
			FileUtils.deleteFromPath(path, user.getImageUid());
		} catch (IOException e) {
			throw new RuntimeException();
		}
	}
}
