package com.iman.service.users;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.exceptions.users.DuplicatedEmail;
import com.iman.exceptions.users.DuplicatedUsername;
import com.iman.exceptions.users.UserNotFound;
import com.iman.model.users.User;
import com.iman.repository.users.UserRepository;

@Service
public class UserService {

	private UserRepository userRepository;
	
	@Autowired
	PasswordEncoder passwordEncoder;

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
	public Boolean validatePasswordFromUsername(String username, String password) {
		return userRepository.validatePasswordFromUsername(username, password) == 1;
	}

	@Transactional
	public Boolean validatePasswordFromEmail(String email, String password) {
		return userRepository.validatePasswordFromEmail(email, password) == 1;
	}

	@Transactional
	public Boolean validatePasswordFromUsernameOrEmail(String username, String password) {
		return userRepository.validatePasswordFromUsernameOrEmail(username, password) == 1;
	}
	
	@Transactional
	public Boolean findUserByPasswordUsernameOrEmail(String username, String password) {
		return userRepository.validatePasswordFromUsernameOrEmail(username, password) == 1;
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
	public void updateUser(User user) throws UserNotFound, DuplicatedEmail, DuplicatedUsername {
		User userBefore = findUserById(user.getId());
		if (userBefore == null) {
			throw new UserNotFound();
		}
		if (!user.getUsername().equals(userBefore.getUsername()) && findUserByUsername(user.getUsername()) != null) {
			throw new DuplicatedUsername();
		}
		if (!user.getEmail().equals(userBefore.getEmail()) && findUserByEmail(user.getEmail()) != null) {
			throw new DuplicatedEmail();
		}
		user.setLastConnection(new Date());
		userRepository.save(user);
	}

	@Transactional
	public void deleteUserById(Long id) throws UserNotFound {
		User user = findUserById(id);
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
}
