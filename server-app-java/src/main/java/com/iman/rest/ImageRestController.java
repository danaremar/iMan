package com.iman.rest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.iman.service.images.FileService;
import com.iman.service.users.UserService;

import io.swagger.annotations.Api;

@RestController
@RequestMapping("/image")
@Api(tags = "Image")
public class ImageRestController {
	
	@Autowired
	FileService fileService;
	
	@Autowired
	UserService userService;

	public ImageRestController(FileService fileService, UserService userService) {
		this.fileService = fileService;
		this.userService = userService;
	}
	
	@PostMapping
	public ResponseEntity<Object> uploadImage(@RequestParam("image") MultipartFile image) {
		try {
			fileService.saveImage(image);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/{imageId}")
	public Resource downloadImage(@PathVariable Long imageId) {
	    return fileService.getImage(imageId);
	}

}
