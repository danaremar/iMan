package com.iman.model.reports.effort;

import java.util.List;

import lombok.Data;

@Data
public class EffortReport {
	
	private Double totalComputedTime;
	
	private Double totalEstimedTime;
	
	private List<EffortByTask> effortsByTask;
	
	private List<EffortByUser> effortsByUser;

}
