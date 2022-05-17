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
	private FileRepository fileRepository;

	public FileService(FileRepository fileRepository) {
		this.fileRepository = fileRepository;
	}
	
	/** @return id of the file */
	public Long saveFile(MultipartFile multipartFile) throws IOException {
		File dbFile = new File();
		dbFile.setName(multipartFile.getName());
		dbFile.setContent(multipartFile.getBytes());
        return fileRepository.save(dbFile).getId();
	}
	
	public Resource getFile(Long fileId) {
	    byte[] file = fileRepository.findById(fileId)
	      .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND))
	      .getContent();

	    return new ByteArrayResource(file);
	}
}
