import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { IncidentListDto } from "src/app/models/incidents/incidents";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { IncidentService } from "src/app/services/incidents/incidents.service";
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

    incidents: Array<IncidentListDto> = []
    pageSize: number = 5
    pageNumber: number = 1
    totalElements: number = 0
    searchTerm: string = ""

    constructor(public effortService: EffortService, public kanbanService: KanbanService, public sprintService: SprintService, public projectService: ProjectService, public formBuilder: FormBuilder, public tokenService: TokenService, public incidentService: IncidentService) {
        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)
    }

    ngOnInit(): void {
        this.loadMyProjects()
    }

    loadFirstProject() {
        if (this.myProjects.length !== 0) {
            let projectId = this.projectService.getStoredProjectId()
            if (projectId == null || projectId == 0) {
                this.projectService.setStoredProjectId(this.myProjects[0].id)
            }
            this.loadIncidentsFromProjectId()
        }
    }

    loadSprintsByProjectIdEvent(projectIdEvent: any) {
        let projectIdStr = projectIdEvent.value
        this.projectService.setStoredProjectId(Number(projectIdStr))
        this.loadIncidentsFromProjectId()
    }

    loadIncidentsFromProjectId() {
        if (this.projectSelectedId) {
            this.incidentService.findIncidentsByProject(this.projectSelectedId, this.pageNumber, this.pageSize).subscribe(
                data => {
                    this.containError = false
                    this.incidents = data.content
                    this.pageNumber = data.pageable.pageNumber
                    this.pageSize = data.pageable.pageSize
                    this.totalElements = data.totalElements
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }

}
