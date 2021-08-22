package com.iman.service.reports;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.iman.model.effort.Effort;
import com.iman.model.kanban.KanbanTask;
import com.iman.model.reports.effort.EffortByTask;
import com.iman.model.reports.effort.EffortByUser;
import com.iman.model.reports.effort.EffortReport;
import com.iman.model.sprints.Sprint;
import com.iman.model.users.User;
import com.iman.model.users.UserShowDto;
import com.iman.service.effort.EffortService;
import com.iman.service.projects.ProjectService;
import com.iman.service.sprints.SprintService;

@Service
public class ReportEffortService extends EffortService {

	@Autowired
	private SprintService sprintService;

	@Autowired
	private ProjectService projectService;


	/*
	 * 
	 * AUXILIAR METHODS
	 * 
	 */

	private Double returnPercentage(Double quantity, Double total) {
		return quantity / total * 100.;
	}

	/*
	 * 
	 * AUXILIAR
	 * 
	 */

	private List<KanbanTask> getTaskList(Long sprintId) {
		Sprint s = sprintService.findById(sprintId);
		projectService.verifyUserRelatedWithProject(s.getProject());
		return s.getKanbanColums().stream().flatMap(x -> x.getTasks().stream()).collect(Collectors.toList());
	}

	private List<Effort> getEffortList(List<KanbanTask> ls) {
		return ls.stream().flatMap(x -> x.getEfforts().stream()).collect(Collectors.toList());
	}

	private Double getTotalEstimedEffort(Stream<KanbanTask> stream) {
		return stream.filter(x -> x.getEstimatedTime() != null)
				.collect(Collectors.summingDouble(KanbanTask::getEstimatedTime));
	}

	private Double getTotalComputedEffort(Stream<Effort> stream) {
		return stream.filter(x -> x.getTime() != null).collect(Collectors.summingDouble(Effort::getTime));
	}

	/*
	 * 
	 * EFFORT BY TASK
	 * 
	 */

	private EffortByTask createEffortByTask(KanbanTask kc, Double computedEffort, Double totalComputedEffort) {
		EffortByTask result = new EffortByTask();
		result.setEstimedEffort(kc.getEstimatedTime());
		result.setComputedEffort(computedEffort);
		result.setPercentageEffort(returnPercentage(computedEffort, totalComputedEffort));
		result.setKanbanTask(kc);
		return result;
	}

	private List<EffortByTask> getEffortsByTask(Stream<Effort> stream, Double totalComputedEffort) {
		List<EffortByTask> ls = new ArrayList<>();
		Map<KanbanTask, Double> map = stream.filter(x -> x.getTime() != null)
				.collect(Collectors.groupingBy(Effort::getKanbanTask, Collectors.summingDouble(Effort::getTime)));
		map.keySet().stream().forEach(x -> ls.add(createEffortByTask(x, map.get(x), totalComputedEffort)));
		return ls;
	}

	/*
	 * 
	 * EFFORT BY USER
	 * 
	 */

	private EffortByUser createEffortByUser(User u, Double computedEffort, Double totalComputedEffort) {
		EffortByUser result = new EffortByUser();
		result.setUser(modelMapper.map(u, UserShowDto.class));
		result.setComputedEffort(computedEffort);
		result.setPercentageEffort(returnPercentage(computedEffort, totalComputedEffort));
		return result;
	}

	private List<EffortByUser> getEffortsByUser(Stream<Effort> stream, Double totalComputedEffort) {
		List<EffortByUser> ls = new ArrayList<>();
		Map<User, Double> map = stream.filter(x -> x.getTime() != null)
				.collect(Collectors.groupingBy(Effort::getUser, Collectors.summingDouble(Effort::getTime)));
		map.keySet().stream().forEach(x -> ls.add(createEffortByUser(x, map.get(x), totalComputedEffort)));
		return ls;
	}

	/*
	 * 
	 * EFFORT REPORT
	 * 
	 */

	public EffortReport getEffortReportBySprintId(Long sprintId) {
		List<KanbanTask> kanbanTaskLs = getTaskList(sprintId);
		List<Effort> effortLs = getEffortList(kanbanTaskLs);

		Double totalEstimatedEffort = getTotalEstimedEffort(kanbanTaskLs.stream());
		Double totalComputedEffort = getTotalComputedEffort(effortLs.stream());

		EffortReport effortReport = new EffortReport();
		effortReport.setTotalEstimedTime(totalEstimatedEffort);
		effortReport.setTotalComputedTime(totalComputedEffort);
		effortReport.setEffortsByTask(getEffortsByTask(effortLs.stream(), totalComputedEffort));
		effortReport.setEffortsByUser(getEffortsByUser(effortLs.stream(), totalComputedEffort));
		return effortReport;
	}

}
