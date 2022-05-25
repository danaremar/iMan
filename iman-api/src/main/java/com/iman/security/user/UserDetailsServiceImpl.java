package com.iman.security.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.iman.model.users.User;
import com.iman.security.exception.UnverifiedUserException;
import com.iman.service.users.UserService;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
	
	@Autowired
	UserService userService;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userService.findUserByUsername(username);
		if(Boolean.FALSE.equals(user.getActive())) {
			throw new UnverifiedUserException();
		}
		return PrincipalUser.build(user);
	}

}
