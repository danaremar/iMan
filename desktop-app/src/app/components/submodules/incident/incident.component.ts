import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { IDatasource, IGetRowsParams } from "ag-grid-community";
import { IncidentCreateDto, IncidentListDto, IncidentShowDto, IncidentUpdateCreateDto, IncidentUpdateDto } from "src/app/models/incidents/incidents";
import { ShowUser } from "src/app/models/user/show-user";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { IncidentService } from "src/app/services/incidents/incidents.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { UserService } from "src/app/services/user/user.service";
import { environment } from "src/environments/environment";
import { ImanSubmodule } from "../submodule.component";

@Component({
    selector: 'iMan-incident',
    templateUrl: './incident.component.html',
    styleUrls: ['./incident.component.css']
})
export class IncidentComponent extends ImanSubmodule implements OnInit {

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
            valueFormatter: (params: { data: IncidentShowDto }) => params.data!=undefined&&params.data.code!=undefined?'#'+params.data.code:''
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
            resizable: true,
            valueFormatter: (params: { data: IncidentShowDto }) => this.formatCreationDate(params.data)
        },
        {
            headerName: "Last modification",
            field: "lastModification",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: IncidentShowDto }) => this.formatLastModification(params.data)
        },
        {
            headerName: "Priority",
            field: "priority",
            sortable: true,
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: IncidentShowDto }) => this.formatPriority(params.data)
        },
        {
            headerName: "Affects",
            field: "affects",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Status",
            field: "status",
            sortable: true,
            filter: true,
            resizable: true
        },
        {
            headerName: "Creator",
            field: "username",
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: IncidentShowDto }) => params.data!=undefined?this.formatUsername(params.data.username):''
        },
        {
            headerName: "Assigned",
            field: "assignedUsername",
            filter: true,
            resizable: true,
            valueFormatter: (params: { data: IncidentShowDto }) => params.data!=undefined?this.formatUsername(params.data.assignedUsername):''
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
    @ViewChild('openViewModal') openViewModal: any
    @ViewChild('closebuttonModalView') closebuttonModalView: any

    // list of incident (paginated, ordered & filtered)
    incidents: Array<IncidentListDto> = []

    // selected incident to show
    selectedIncident: IncidentShowDto | undefined

    // incident form in modal view
    isEditable: boolean = false
    formIncident: FormGroup
    formIncidentUpdate: FormGroup
    incidentContainError: boolean = false
    incidentMessageError: string | undefined



    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(public effortService: EffortService, public kanbanService: KanbanService, public sprintService: SprintService, public projectService: ProjectService, public formBuilder: FormBuilder, public tokenService: TokenService, public incidentService: IncidentService, private userService: UserService) {
        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)

        this.formIncident = formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []],
            reported: ['', []]
        })

        this.formIncidentUpdate = formBuilder.group({
            description: ['', []],
            estimatedTime: ['', []],
            affects: ['', []],
            priority: ['', []],
            status: ['', []],
            assignedUsername: ['', []]
        })

    }



    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit(): void {
        this.loadProject = true
        this.loadMyProjects()
    }

    editable() {
        this.isEditable = !this.isEditable
    }

    loadAfterProject() {
        this.reloadGridTable()
    }

    loadSelectedData(obj: any) {
        this.incidentService.getIncidentById(obj.id).subscribe(
            data => {
                this.containError = false
                this.selectedIncident = data
                this.isEditable = false
                this.buildIncidentForm()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    buildIncidentForm() {
        this.formIncident.reset()
        this.formIncidentUpdate.reset()
        if (this.selectedIncident != undefined) {
            this.formIncident = this.formBuilder.group({
                title: [this.selectedIncident.title, [Validators.required]],
                description: [this.selectedIncident.description, []],
                reported: [this.selectedIncident.reported, []]
            })
        }

    }

    newIncident() {
        this.isEditable = true
        this.selectedIncident = undefined
        this.incidentContainError = false
        this.buildIncidentForm()
        this.openViewModal.nativeElement.click()
    }



    /***************************
        METHODS -> FORMAT
    ***************************/

    formatPriority(incidentShowDto: IncidentShowDto): string {
        if (incidentShowDto != undefined && incidentShowDto.priority != undefined) {
            return this.getPriority(incidentShowDto.priority)
        } else {
            return ''
        }
    }

    formatCreationDate(incidentShowDto: IncidentShowDto): string {
        if (incidentShowDto != undefined && incidentShowDto.date != undefined) {
            var date = this.getFormatedDate(incidentShowDto.date, 'HH:mm:ss dd/MM/yyyy')
            return date ? date : ''
        } else {
            return ''
        }
    }

    formatLastModification(incidentShowDto: IncidentShowDto): string {
        if (incidentShowDto != undefined && incidentShowDto.lastModification != undefined) {
            var date = this.getFormatedDate(incidentShowDto.lastModification, 'HH:mm:ss dd/MM/yyyy')
            return date ? date : ''
        } else {
            return ''
        }
    }

    formatUsername(username: string): string {
        if (username != undefined) {
            return '@' + username
        } else {
            return ''
        }
    }



    /***************************
        METHODS -> UPLOADS
    ***************************/

    // add or edit
    uploadIncident() {

        // CREATE
        if (!this.selectedIncident) {
            if (this.projectSelectedId != undefined) {
                let newIncident = new IncidentCreateDto(this.projectSelectedId, this.formIncident.value.title, this.formIncident.value.description, this.formIncident.value.reported)
                this.incidentService.createIncident(newIncident).subscribe(
                    res => {
                        this.reloadGridTable()
                        this.closebuttonModalView.nativeElement.click()
                    },
                    err => {
                        var r = err.error.text
                        if (r == undefined) {
                            r = 'Error produced'
                        }
                        this.incidentMessageError = r;
                        this.incidentContainError = true
                    }
                )
            }

            //UPDATE
        } else {
            let updateIncident = new IncidentUpdateDto(this.selectedIncident.id, this.formIncident.value.title, this.formIncident.value.description, this.formIncident.value.reported)
            this.incidentService.updateIncident(updateIncident).subscribe(
                res => {
                    this.loadSelectedData(this.selectedIncident)
                    this.reloadGridTable()
                    this.isEditable = false
                },
                err => {
                    var r = err.error.text
                    if (r == undefined) {
                        r = 'Error produced'
                    }
                    this.incidentMessageError = r;
                    this.incidentContainError = true
                }
            )

        }
    }

    createNewIncidentUpdate() {
        if (this.selectedIncident != undefined) {
            let createIncidentUpdate = new IncidentUpdateCreateDto(this.formIncidentUpdate.value.description, this.formIncidentUpdate.value.estimatedTime, this.formIncidentUpdate.value.affects, this.formIncidentUpdate.value.priority, this.formIncidentUpdate.value.status, this.formIncidentUpdate.value.assignedUsername)
            this.incidentService.createIncidentUpdate(this.selectedIncident.id, createIncidentUpdate).subscribe(
                res => {
                    this.loadSelectedData(this.selectedIncident)
                    this.formIncidentUpdate.reset()
                    this.reloadGridTable()
                },
                err => {
                    var r = err.error.text
                    if (r == undefined) {
                        r = 'Error produced'
                    }
                    this.incidentMessageError = r;
                    this.incidentContainError = true
                }
            )
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
        this.openViewModal.nativeElement.click()
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



    /***************************
       METHODS -> IMAGE
    ***************************/

    public getProfileImageUrlFromUser(user: ShowUser): any {
        return this.userService.getUrlFromProfile(user.imageUid)
    }

}

