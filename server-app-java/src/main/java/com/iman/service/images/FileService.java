package com.iman.service.images;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.iman.model.files.File;
import com.iman.repository.files.FileRepository;

@Service
public class FileService {
	
	@Autowired
	private FileRepository imageRepository;

	public FileService(FileRepository imageRepository) {
		this.imageRepository = imageRepository;
	}
	
	/** @return id of the image */
	public Long saveImage(MultipartFile multipartImage) throws IOException {
		File dbImage = new File();
        dbImage.setName(multipartImage.getName());
        dbImage.setContent(multipartImage.getBytes());
        return imageRepository.save(dbImage).getId();
	}
	
	public Resource getImage(Long imageId) {
	    byte[] image = imageRepository.findById(imageId)
	      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
	      .getContent();

	    return new ByteArrayResource(image);
	}
}
