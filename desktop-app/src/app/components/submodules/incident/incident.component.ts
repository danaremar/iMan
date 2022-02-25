import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { GridApi, IDatasource, IGetRowsParams, RefreshCellsParams } from "ag-grid-community";
import { IncidentListDto } from "src/app/models/incidents/incidents";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { IncidentService } from "src/app/services/incidents/incidents.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { environment } from "src/environments/environment";
import { ImanSubmodule } from "../submodule.component";

@Component({
    selector: 'iMan-incident',
    templateUrl: './incident.component.html',
    styleUrls: ['./incident.component.css']
})
export class IncidentComponent extends ImanSubmodule implements OnInit {

    incidents: Array<IncidentListDto> = []
    incCol = [
        {
            headerName: "Code",
            field: "code",
            sortable: true,
            filter: true,
            maxWidth: 120,
            unSortIcon: true,
            pinned: 'left'
        },
        {
            headerName: "Title",
            field: "title",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Description",
            field: "description",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Reported",
            field: "reported",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Estimated time",
            field: "estimatedTime",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Creation",
            field: "date",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Last modification",
            field: "lastModification",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Priority",
            field: "priority",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Affects",
            field: "affects",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Creator",
            field: "username",
            filter: true,
            resizable: true
        },
        {
            headerName: "Assigned",
            field: "assignedUsername",
            filter: true,
            resizable: true
        }
    ]

    @ViewChild('openViewModal') openViewModal: any;

    private gridApi: any
    private gridColumnApi: any

    pageSize: number = environment.defaultPageSize
    pageNumber: number = 1
    totalElements: number = 0

    constructor(public effortService: EffortService, public kanbanService: KanbanService, public sprintService: SprintService, public projectService: ProjectService, public formBuilder: FormBuilder, public tokenService: TokenService, public incidentService: IncidentService, private modalService: NgbModal) {
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
        }
    }

    loadSprintsByProjectIdEvent(projectIdEvent: any) {
        let projectIdStr = projectIdEvent.value
        this.projectSelectedId = Number(projectIdStr)
        this.projectService.setStoredProjectId(this.projectSelectedId)
        this.reloadGridTable()
    }

    reloadGridTable() {
        this.gridApi.setDatasource(this.dataSource);
    }

    loadSelectedRow(event:any) {
        
        // LOAD VIEW / EDIT / REMOVE DATA

        // OPEN MODAL
        this.openViewModal.nativeElement.click()
    }

    /* AG DATAGRID */

    dataSource: IDatasource = {
        getRows: (params: IGetRowsParams) => {
            this.getRows(params)
        }
    }

    getRows(params: IGetRowsParams) {
        if (this.projectSelectedId) {
            this.pageSize = this.gridApi.paginationGetPageSize()
            this.pageNumber = this.gridApi.paginationGetCurrentPage() + 1
            this.incidentService.findIncidentsByProject(this.projectSelectedId, this.pageNumber, this.pageSize, params.sortModel, params.filterModel, this.incCol).subscribe(
                data => {
                    this.containError = false
                    this.incidents = data.content
                    this.pageNumber = data.pageable.pageNumber + 1
                    this.pageSize = data.pageable.pageSize
                    this.totalElements = data.totalElements
                    params.successCallback(this.incidents, this.totalElements)
                },
                err => {
                    this.returnPrincipalError(err)
                    params.failCallback()
                }
            )
        }
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.setDatasource(this.dataSource);
    }

}

