import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { ImanSubmodule } from "../submodule.component";

import { gantt } from "dhtmlx-gantt";
import { TaskService } from "src/app/services/gantt/task.service";
import { LinkService } from "src/app/services/gantt/link.service";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'iMan-gantt',
    templateUrl: './gantt.component.html',
    providers: [TaskService, LinkService],
    styleUrls: ['./gantt.component.css']
})
export class GanttComponent extends ImanSubmodule implements OnInit, AfterViewInit {

    @ViewChild("gantt_here") ganttContainer: any

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService, private taskService: TaskService, private linkService: LinkService) {
        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)
    }

    ngOnInit(): void {
        this.loadSprint = true
        this.loadMyProjects()
    }

    ngAfterViewInit(): void {
        gantt.init(this.ganttContainer.nativeElement)
        Promise.all([this.taskService.get(), this.linkService.get()])
            .then(([data, links]) => {
                gantt.parse({ data, links });
            });
    }


}