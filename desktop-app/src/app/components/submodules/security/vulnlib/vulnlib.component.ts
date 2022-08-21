import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { IDatasource, IGetRowsParams } from "ag-grid-community";
import { ShowUser } from "src/app/models/user/show-user";
import { VulnLibListDto, VulnLibShowDto } from "src/app/models/vulns/vulnlib";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { VulnLibService } from "src/app/services/vulns/vulnlib.service";
import { environment } from "src/environments/environment";
import { ImanSubmodule } from "../../submodule.component";

@Component({
    selector: 'iMan-vulnlib',
    templateUrl: './vulnlib.component.html',
    styleUrls: ['./vulnlib.component.css'],
})
export class VulnlibComponent extends ImanSubmodule implements OnInit {

    /***************************
            AG GRID
    ***************************/

    incCol = [
        {
            headerName: "Name",
            field: "name",
            sortable: true,
            filter: true,
            maxWidth: 200,
            unSortIcon: true,
            pinned: 'left'
        },
        {
            headerName: "Company",
            field: "company",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Product",
            field: "product",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Affected versions",
            field: "affectedVersions",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Standard",
            field: "standard",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Creation date",
            field: "creationDate",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Modification date",
            field: "modificationDate",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "CWE type",
            field: "cweType",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "CWE",
            field: "cwe",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "CVSS",
            field: "cvss",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "CVSS vector",
            field: "cvssVector",
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
    @ViewChild('openVulnViewModal') openVulnLibViewModal: any

    // list of vulnlib
    vulnlib: Array<VulnLibListDto> = []

    // select vulnlin
    selectedVulnLib: VulnLibShowDto | undefined

    // active form in modal view
    isEditing: boolean = false



    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService, public vulnLibService: VulnLibService) {
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
        this.vulnLibService.getVulnLibById(obj.id).subscribe({
            next: (n) => {
                this.containError = false
                this.selectedVulnLib = n
                this.isEditing = false
            },
            error: (e) => {
                this.returnPrincipalError(e)
            }
        })
    }

    newVulnLib() {
        this.selectedVulnLib = undefined
        this.isEditing = true
        this.openVulnLibViewModal.nativeElement.click()
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
        this.openVulnLibViewModal.nativeElement.click()
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
            this.vulnLibService.findVulnLibsByProject(this.projectSelectedId, this.pageNumber, this.pageSize, params.sortModel, params.filterModel, this.incCol).subscribe({
                next: (n) => {
                    this.containError = false
                    this.vulnlib = n.content
                    this.pageNumber = n.pageable.pageNumber + 1
                    this.pageSize = n.pageable.pageSize
                    this.totalElements = n.totalElements
                    params.successCallback(this.vulnlib,this.totalElements)
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
