import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { ImanSubmodule } from "../submodule.component";

@Component({
    selector: 'iMan-incident',
    templateUrl: './incident.component.html',
    styleUrls: ['./incident.component.css']
})
export class IncidentComponent extends ImanSubmodule implements OnInit {

    constructor(public effortService: EffortService, public kanbanService: KanbanService, public sprintService: SprintService, public projectService: ProjectService, public formBuilder: FormBuilder, public tokenService: TokenService) {
        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)
    }

    ngOnInit(): void {
        this.loadMyProjects()
    }

}