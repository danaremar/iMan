package com.iman.security.user;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.iman.model.users.User;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PrincipalUser implements UserDetails {
	
	private static final long serialVersionUID = 1L;
	private String username;
	private String password;

	private String email;
	private String firstName;
	private String lastName;

	private Collection<GrantedAuthority> authorities;

	public static PrincipalUser build(User user) {
		List<GrantedAuthority> authorities = new ArrayList<>();
		authorities.add(new SimpleGrantedAuthority(RoleTypeUtil.ROLE_USER));

		return new PrincipalUser(user.getUsername(), user.getPassword(), user.getEmail(), user.getName(),
				user.getLastName(), authorities);
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
