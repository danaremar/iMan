import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { IDatasource, IGetRowsParams } from "ag-grid-community";
import { ShowUser } from "src/app/models/user/show-user";
import { VulnListDto, VulnShowDto } from "src/app/models/vulns/vuln";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { VulnService } from "src/app/services/vulns/vuln.service";
import { environment } from "src/environments/environment";
import { ImanSubmodule } from "../../submodule.component";

@Component({
    selector: 'iMan-vuln',
    templateUrl: './vuln.component.html',
    styleUrls: ['./vuln.component.css'],
})
export class VulnComponent extends ImanSubmodule implements OnInit {

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
            valueFormatter: (params: { data: VulnListDto }) => params.data != undefined ? this.formatDateAgGrid(params.data.creationDate) : ''
        },
        {
            headerName: "Affected version",
            field: "affectedVersion",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "New version",
            field: "version",
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
            headerName: "Notified",
            field: "notified",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Fixed",
            field: "fixed",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Patch type",
            field: "patchType",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Patch date",
            field: "patchDate",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: VulnListDto }) => params.data != undefined ? this.formatDateAgGrid(params.data.patchDate) : ''
        },
        {
            headerName: "Created by",
            field: "createdBy",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: VulnListDto }) => params.data != undefined ? this.formatUsernameAgGrid(params.data.createdBy) : ''
        },
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
    @ViewChild('openVulnViewModal') openVulnViewModal: any

    // list of vulnlib
    vulns: Array<VulnListDto> = []

    // select vulnlin
    selectedVuln: VulnShowDto | undefined

    // active form in modal view
    isEditing: boolean = false



    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService, public vulnService: VulnService) {
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
        this.vulnService.getVulnById(obj.id).subscribe({
            next: (n) => {
                this.containError = false
                this.selectedVuln = n
                this.isEditing = false
            }
        })
    }

    newVuln() {
        this.selectedVuln = undefined
        this.isEditing = true
        this.openVulnViewModal.nativeElement.click()
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
        this.openVulnViewModal.nativeElement.click()
    }


    dataSource: IDatasource = {
        getRows: (params: IGetRowsParams) => {
            this.getRows(params)
        }
    }

    getRows(params: IGetRowsParams) {
        if(this.projectSelectedId) {
            this.pageSize = this.gridApi.paginationGetPageSize()
            this.pageNumber = this.gridApi.paginationGetCurrentPage() + 1
            this.vulnService.findVulnsByProject(this.projectSelectedId, this.pageNumber, this.pageSize, params.sortModel, params.filterModel, this.incCol).subscribe({
                next: (n) => {
                    this.containError = false
                    this.vulns = n.content
                    this.pageNumber = n.pageable.pageNumber + 1
                    this.pageSize = n.pageable.pageSize
                    this.totalElements = n.totalElements
                    params.successCallback(this.vulns,this.totalElements)
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