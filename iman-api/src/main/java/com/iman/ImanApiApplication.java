package com.iman;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ImanApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(ImanApiApplication.class, args);
	}
	
	@Bean
	public WebMvcConfigurer configurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addResourceHandlers(ResourceHandlerRegistry registry) {
				registry.addResourceHandler("/images/**")
					.addResourceLocations("file:src/main/resources/images/");
	        		//.addResourceLocations("file:///D:/images/");
			}
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/**")
				
						// WEB RESTRICTED
						.allowedOrigins("http://localhost:4200", "https://danaremar.github.io");
				
						// VISIBLE FOR ALL
						// .allowedOrigins("*");
			}
		};
	}
}


