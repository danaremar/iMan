package com.iman.model.files;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Index;
import javax.persistence.Lob;
import javax.persistence.Table;

import org.hibernate.validator.constraints.Length;

import lombok.Data;

@Entity
@Data
@Table(name = "file", indexes = { @Index(columnList = "name") })
public class File {
	
	@Id
	@GeneratedValue
	Long id;
	
	@Length(max=255)
	String name;
	
	@Lob
	byte[] content;

}
