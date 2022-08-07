package com.iman.model.actives;

import java.util.Date;

import javax.validation.constraints.Min;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActiveSearchDto {
	
	@Min(value = 0)
	private Long code;

	@Length(max = 50)
	private String name;

	@Length(max = 50)
	private String description;

	private Date creationDate;

	@Length(max = 50)
	private String createdBy;

	private Date lastModification;

	@Length(max = 50)
	private String modifiedBy;

	@Length(max = 50)
	private String type;

	@Length(max = 50)
	private String company;

	@Length(max = 50)
	private String product;

	@Length(max = 50)
	private String version;

	@Length(max = 50)
	private String cpeType;

	@Length(max = 255)
	private String cpe;

	@Length(max = 50)
	private String importance;

	private Date startAdquisition;

	private Date endAdquisition;

	private Date endOfLife;

	@Min(value = 0)
	private Double cost;

	@Length(max = 50)
	private String periodicity;

	@Length(max = 50)
	private String subscriptionType;

	@Length(max = 50)
	private String location;
}
