import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { ImanSubmodule } from "../submodule.component";

import { gantt } from "dhtmlx-gantt";
import { GanttService } from "src/app/services/gantt/gantt.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'iMan-gantt',
    templateUrl: './gantt.component.html',
    styleUrls: ['./gantt.component.css']
})
export class GanttComponent extends ImanSubmodule implements OnInit, AfterViewInit {

    @ViewChild("gantt_here") ganttContainer: any

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService, private ganttService: GanttService) {
        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)
    }

    tasks = {
        "data": [
            {id: 1, text: "Task #1", start_date: "01-03-2022", duration: 1, progress: 0.6, color:'blue'},
            {id: 2, text: "Task #2", start_date: "02-03-2022", duration: 1, progress: 0.4, color:'green'}
        ],
        "links": [
            {id: 1, source: 1, target: 2, type: "0"}
        ]
    }

    ngOnInit(): void {
        this.loadTasks = true
        this.loadMyProjects()
    }

    ngAfterViewInit(): void {
        this.loadTasks = true
        this.loadMyProjects()
        
        // var ganttTask = this.ganttService.getGanttTasks(this.myTasks)

        gantt.init(this.ganttContainer.nativeElement)
        // gantt.parse({"data":ganttTask});
    }

    loadAfterTask() {
        var ganttTask = this.ganttService.getGanttTasks(this.myTasks)
        gantt.parse({"data":ganttTask});
    }


}