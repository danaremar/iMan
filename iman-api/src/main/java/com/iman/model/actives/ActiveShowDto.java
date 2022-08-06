package com.iman.model.actives;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class ActiveShowDto extends ActiveListDto {

	private List<ActiveShowDto> children;

	private List<ActiveUsersShowDto> activeUsers;

}
