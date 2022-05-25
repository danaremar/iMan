package com.iman.model.reports.effort;

import com.iman.model.users.UserShowDto;

import lombok.Data;

@Data
public class EffortByUser {

	private UserShowDto user;

	private Double computedEffort;

	private Double percentageEffort;

}
