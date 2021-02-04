package com.iman;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;

@SpringBootApplication
public class ImanApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImanApiApplication.class, args);
	}
	
	protected void configure(HttpSecurity httpSecurity) throws Exception {
        httpSecurity.authorizeRequests().antMatchers("/").permitAll();
    }
}


