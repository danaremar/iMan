package com.iman.service.users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.iman.model.users.User;
import com.iman.repository.users.UserRepository;

@Service
public class UserService {
	
	private UserRepository userRepository;
	
	@Autowired
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
	}
	
	@Transactional
	public User findUserById(Long id) {
		return userRepository.findById(id).get();
	}
	
	@Transactional
	public User findUserByUsername(String username) {
		return userRepository.findByUsername(username).get();
	}
	
	@Transactional
	public Boolean validatePasswordFromUsername(String username, String password) {
		return userRepository.validatePasswordFromUsername(username, password)==1;
	}
	
	@Transactional
	public Boolean validatePasswordFromEmail(String email, String password) {
		return userRepository.validatePasswordFromEmail(email, password)==1;
	}
	
	@Transactional
	public Boolean validatePasswordFromUsernameOrEmail(String username, String password) {
		return userRepository.validatePasswordFromUsernameOrEmail(username, password)==1;
	}
	
	@Transactional
	public Long countAllUsersFromSystem() {
		return userRepository.countActiveUsers();
	}
	
	@Transactional
	public void addUser(User user) {
		userRepository.save(user);
	}
	
	@Transactional
	public void updateUser(User user) {
		if(findUserById(user.getId())!=null) {
			userRepository.save(user);
		}
	}
	
	@Transactional
	public void deleteUser(User user) {
		userRepository.delete(user);
	}
	
	@Transactional
	public void deleteUserById(Long id) {
		userRepository.deleteById(id);
	}
}
