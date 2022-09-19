package com.iman.model.risk.risk;

import java.util.Date;
import javax.validation.constraints.Min;
import javax.validation.constraints.PastOrPresent;

import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskSearchDto {
	
	@Min(value = 0)
	private Long code;

	@Length(max = 50)
	private String name;
	
	@Length(max = 255)
	private String description;
	
	@PastOrPresent
	private Date creationDate;

	@Length(max = 50)
	private String createdBy;

	@PastOrPresent
	private Date lastModification;

	@Length(max = 50)
	private String modifiedBy;
	
	@Length(max = 50)
	private String riskType;
	
	@Min(value = 0)
	private Double totalWoSfg;
	
	@Min(value = 0)
	private Double total;

}
