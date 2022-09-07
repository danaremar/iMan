import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { IDatasource, IGetRowsParams } from "ag-grid-community";
import { RiskListDto, RiskShowDto } from "src/app/models/risks/risk";
import { ShowUser } from "src/app/models/user/show-user";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { RiskService } from "src/app/services/risks/risk.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { environment } from "src/environments/environment";
import { ImanSubmodule } from "../../submodule.component";

@Component({
    selector: 'risk-component',
    templateUrl: './risk.component.html',
    styleUrls: ['./risk.component.css']
})
export class RiskComponent extends ImanSubmodule implements OnInit {

    /***************************
            AG GRID
    ***************************/

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
            headerName: "Name",
            field: "name",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Creation date",
            field: "creationDate",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: RiskListDto }) => params.data != undefined ? this.formatDateAgGrid(params.data.creationDate) : ''
        },
        {
            headerName: "Created by",
            field: "createdBy",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: RiskListDto }) => params.data != undefined ? this.formatUsernameAgGrid(params.data.createdBy) : ''
        },
        {
            headerName: "Last modification",
            field: "lastModification",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: RiskListDto }) => params.data != undefined ? this.formatDateAgGrid(params.data.lastModification) : ''
        },
        {
            headerName: "Modified by",
            field: "modifiedBy",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: RiskListDto }) => params.data != undefined ? this.formatUsernameAgGrid(params.data.modifiedBy) : ''
        },
        {
            headerName: "Risk type",
            field: "riskType",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Total - sfg",
            field: "totalWoSfg",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Total",
            field: "total",
            sortable: true,
            filter: true,
            resizable: true
        }
    ]

    private gridApi: any
    private gridColumnApi: any

    /***************************
            PAGINATION
    ***************************/

    pageSize: number = environment.defaultPageSize
    pageNumber: number = 1
    totalElements: number = 0


    /***************************
            GENERAL
    ***************************/

    // open modal view
    @ViewChild('openRiskViewModal') openRiskViewModal: any
    @ViewChild('openRiskConfigViewModal') openRiskConfigViewModal: any

    // list of risks
    risks: Array<RiskListDto> = []

    // select risk
    selectedRisk: RiskShowDto | undefined

    // active form in modal view
    isEditing: boolean = false



    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService, public riskService: RiskService) {
        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)
    }

    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit(): void {
        this.loadProject = true
        this.loadMyProjects()
    }

    loadAfterProject(): void {
        this.reloadGridTable()
    }

    loadSelectedData(obj: any) {
        this.riskService.getRiskById(obj.id).subscribe({
            next: (n) => {
                this.containError = false
                this.selectedRisk = n
                this.isEditing = false
            }
        })
    }

    newRisk() {
        this.selectedRisk = undefined
        this.isEditing = true
        this.openRiskViewModal.nativeElement.click()
    }

    openRiskConfig() {
        this.openRiskConfigViewModal.nativeElement.click()
    }


    /***************************
        METHODS -> FORMAT
    ***************************/

    formatDateAgGrid(date: Date | undefined): string {
        if (parent != undefined && date != undefined) {
            let dateStr = this.getFormatedDate(date, 'HH:mm:ss dd/MM/yyyy')
            return dateStr ? dateStr : ''
        } else {
            return ''
        }
    }

    formatUsernameAgGrid(user: ShowUser | undefined): string {
        if (parent != undefined && user != undefined && user.username != undefined) {
            return '@' + user.username
        } else {
            return ''
        }
    }

    /***************************
        METHODS -> AG GRID 
    ***************************/

    reloadGridTable() {
        this.gridApi.setDatasource(this.dataSource);
    }

    loadSelectedRow(event: any) {
        // load view/edit data
        this.loadSelectedData(event.data)
        // open modal
        this.openRiskViewModal.nativeElement.click()
    }


    dataSource: IDatasource = {
        getRows: (params: IGetRowsParams) => {
            this.getRows(params)
        }
    }

    getRows(params: IGetRowsParams) {
        if (this.projectSelectedId) {
            this.pageSize = this.gridApi.paginationGetPageSize()
            this.pageNumber = this.gridApi.paginationGetCurrentPage() + 1
            this.riskService.findRisksByProject(this.projectSelectedId, this.pageNumber, this.pageSize, params.sortModel, params.filterModel, this.incCol).subscribe({
                next: (n) => {
                    this.containError = false
                    this.risks = n.content
                    this.pageNumber = n.pageable.pageNumber + 1
                    this.pageSize = n.pageable.pageSize
                    this.totalElements = n.totalElements
                    params.successCallback(this.risks, this.totalElements)
                },
                error: (e) => {
                    this.returnPrincipalError(e)
                    params.failCallback()
                }
            })
        }
    }

    onGridReady(params: any) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.setDatasource(this.dataSource);
    }



}