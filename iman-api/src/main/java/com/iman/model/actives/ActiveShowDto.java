package com.iman.model.actives;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIncludeProperties;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ActiveShowDto extends ActiveListDto {

	@JsonIncludeProperties({ "id", "code", "name", "description", "children" })
	private List<ActiveShowDto> children;

	@JsonIncludeProperties({ "id", "code", "name", "active", "children" })
	private List<ActiveUsersShowDto> activeUsers;

}
