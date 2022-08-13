import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { UserService } from "src/app/services/user/user.service";
import { ImanSubmodule } from "../../submodule.component";
import { ActiveListDto, ActiveShowDto, ActiveCreateDto, ActiveSearchDto, ActiveShowChildrenDto, ActiveUpdateDto } from "src/app/models/actives/actives";
import { ShowUser } from "src/app/models/user/show-user";
import { environment } from "src/environments/environment";
import { ActiveService } from "src/app/services/actives/actives.service";
import { IDatasource, IGetRowsParams } from "ag-grid-community";

@Component({
    selector: 'iMan-security',
    templateUrl: './active.component.html',
    styleUrls: ['./active.component.css'],
})
export class ActiveComponent extends ImanSubmodule implements OnInit {

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
            pinned: 'left',
            valueFormatter: (params: { data: ActiveListDto }) => params.data != undefined && params.data.code != undefined ? '#' + params.data.code : ''
        },
        {
            headerName: "Name",
            field: "name",
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
            headerName: "Creation date",
            field: "creationDate",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: ActiveListDto }) => params.data!=undefined?this.formatDateAgGrid(params.data.creationDate):''
        },
        {
            headerName: "Created by",
            field: "createdBy",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: ActiveListDto }) => params.data!=undefined?this.formatUsernameAgGrid(params.data.createdBy):''
        },
        {
            headerName: "Last update",
            field: "lastModification",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: ActiveListDto }) => params.data!=undefined?this.formatDateAgGrid(params.data.lastModification):''
        },
        {
            headerName: "Modified by",
            field: "modifiedBy",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: ActiveListDto }) => params.data!=undefined?this.formatUsernameAgGrid(params.data.modifiedBy):''
        },
        {
            headerName: "Type",
            field: "type",
            sortable: true,
            filter: true,
            resizable: true
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
            headerName: "Version",
            field: "version",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "CPE type",
            field: "cpeType",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "CPE",
            field: "cpe",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Importance",
            field: "importance",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Start adquisition",
            field: "startAdquisition",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: ActiveListDto }) => params.data!=undefined?this.formatDateAgGrid(params.data.startAdquisition):''
        },
        {
            headerName: "End adquisition",
            field: "endAdquisition",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: ActiveListDto }) => params.data!=undefined?this.formatDateAgGrid(params.data.endAdquisition):''
        },
        {
            headerName: "End of life",
            field: "endOfLife",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: ActiveListDto }) => params.data!=undefined?this.formatDateAgGrid(params.data.endOfLife):''
        },
        {
            headerName: "Cost",
            field: "cost",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Periodicity",
            field: "periodicity",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Subscription type",
            field: "subscriptionType",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Location",
            field: "location",
            sortable: true,
            filter: true,
            resizable: true
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
    @ViewChild('openActiveViewModal') openActiveViewModal: any

    // list of actives
    actives: Array<ActiveListDto> = []

    // select active
    selectedActive: ActiveShowDto | undefined

    // active form in modal view
    isEditable: boolean = false
    formActive: FormGroup
    formActiveUpdate: FormGroup
    activeContainError: boolean = false
    activeMessageError: string | undefined




    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService, private userService: UserService, public activeService: ActiveService) {
        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)

        this.formActive = formBuilder.group({

        })

        this.formActiveUpdate = formBuilder.group({

        })
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
        this.activeService.getActiveById(obj.id).subscribe(
            data => {
                this.containError = false
                this.selectedActive = data
                this.isEditable = false
                // TODO
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
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
        this.openActiveViewModal.nativeElement.click()
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
            this.activeService.findActivesByProject(this.projectSelectedId, this.pageNumber, this.pageSize, params.sortModel, params.filterModel, this.incCol).subscribe(
                data => {
                    this.containError = false
                    this.actives = data.content
                    this.pageNumber = data.pageable.pageNumber + 1
                    this.pageSize = data.pageable.pageSize
                    this.totalElements = data.totalElements
                    params.successCallback(this.actives, this.totalElements)
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



    /***************************
       METHODS -> IMAGE
    ***************************/

    public getProfileImageUrlFromUser(user: ShowUser): any {
        return this.userService.getUrlFromProfile(user.imageUid)
    }

}