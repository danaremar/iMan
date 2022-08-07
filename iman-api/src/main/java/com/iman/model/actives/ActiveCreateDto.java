package com.iman.model.actives;

import java.util.Date;
import java.util.List;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ActiveCreateDto {

	@NotBlank
	@Length(max = 50)
	private String name;

	@Length(max = 255)
	private String description;

	@Length(max = 50)
	private String type;

	@Length(max = 50)
	private String company;

	@Length(max = 50)
	private String product;

	@Length(max = 50)
	private String version;

	@Length(max = 10)
	private String cpeType;

	@Length(max = 50)
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
	
	private List<Long> children;
	
	private List<ActiveUsersCreateDto> activeUsers;
	
	private Long projectId;

}
