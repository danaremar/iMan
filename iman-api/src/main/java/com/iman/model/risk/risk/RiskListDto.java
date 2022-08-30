package com.iman.model.risk.risk;

import java.util.Date;
import com.iman.model.actives.ActiveShowDto;
import com.iman.model.users.UserShowDto;
import com.iman.model.vulnerability.vuln.VulnShowDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RiskListDto {
	
	private Long id;
	
	private Long code;

	private String name;
	
	private String description;
	
	private Date creationDate;

	private UserShowDto createdBy;

	private Date lastModification;

	private UserShowDto modifiedBy;
	
	private ActiveShowDto assignedActive;
	
	private VulnShowDto assignedVuln;
	
	private String riskType;
	
	private Double totalWoSfg;
	
	private Double total;

}
