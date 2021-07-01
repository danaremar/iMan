package com.iman.repository.files;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.iman.model.files.File;

@Repository
public interface FileRepository extends JpaRepository<File, Long> {

}
