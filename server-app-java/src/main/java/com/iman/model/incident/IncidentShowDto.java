package com.iman.model.incident;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class IncidentShowDto extends IncidentListDto {
	
	private List<IncidentUpdateShowDto> updates;

}
