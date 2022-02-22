import { Component, OnInit, QueryList, ViewChildren } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { IncidentListDto } from "src/app/models/incidents/incidents";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { IncidentService } from "src/app/services/incidents/incidents.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { NgbdSortableHeader, SortEvent } from "src/app/services/util/sortable.service";
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

    @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader> | undefined

    onSort({ column, direction }: SortEvent) {

        const compare = (v1: string | number, v2: string | number) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

        if (this.headers) {

            // resetting other headers
            this.headers.forEach(header => {
                if (header.sortable !== column) {
                    header.direction = '';
                }
            });

            // sorting countries
            if (direction === '' || column === '') {
                this.incidents;
            } else {
                [...this.incidents].sort((a, b) => {
                    const res = compare(a[column].toString(), b[column].toString());
                    return direction === 'asc' ? res : -res;
                });
            }

        }

    }

}
