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

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;

@RestController
@RequestMapping("/file")
@Tag(name = "File")
@SecurityRequirement(name = "Bearer Authentication")
public class FileRestController {
	
	@Autowired
	FileService fileService;
	
	@Autowired
	UserService userService;

	public FileRestController(FileService fileService, UserService userService) {
		this.fileService = fileService;
		this.userService = userService;
	}
	
	@PostMapping
	public ResponseEntity<Object> uploadFile(@RequestParam("file") MultipartFile file) {
		try {
			fileService.saveFile(file);
			return new ResponseEntity<>(HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping(value = "/{fileId}")
	public Resource loadFile(@PathVariable Long fileId) {
	    return fileService.getFile(fileId);
	}

}
