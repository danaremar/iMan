package com.iman.model.actives;

import java.util.Date;

import com.iman.model.users.UserShowDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActiveListDto {
	
	private Long id;
	
	private String name;
	
	private String description;
	
	private Date creationDate;
	
	private UserShowDto createdBy;
	
	private Date lastModification;
	
	private UserShowDto modifiedBy;
	
	private Boolean active;
	
	private String type;
	
	private String company;
	
	private String product;
	
	private String version;
	
	private String cpeType;
	
	private String cpe;
	
	private String importance;
	
	private Date startAdquisition;
	
	private Date endAdquisition;
	
	private Date endOfLife;
	
	private Double cost;
	
	private String periodicity;
	
	private String subscriptionType;
	
	private String location;

}
