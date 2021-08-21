import { DatePipe, Time } from "@angular/common";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Effort, EffortStart, EffortUpdate } from "src/app/models/effort/effort";
import { Project } from "src/app/models/project/project";
import { ProjectRole } from "src/app/models/project/roles";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";

@Component({
    selector: 'iMan-effort',
    templateUrl: './effort.component.html',
    styleUrls: ['./effort.component.css']
})
export class EffortComponent implements OnInit {

    @ViewChild('closebuttonCreateEffort') closebuttonCreateEffort: any;
    @ViewChild('closebuttonUpdateEffort') closebuttonUpdateEffort: any;



    /***************************
            GENERAL
    ***************************/

    myProjects: any
    mySprints: any
    myTasks: any
    projectSelectedId: number | null | undefined
    sprintSelectedId: number | null | undefined
    kanbanTaskSelectedId: number | null | undefined
    effortSelected: Effort | undefined
    adminAccess: boolean = false
    memberAccess: boolean = false
    efforts: any
    actualDate: any

    activeEffort: any
    changedToDescription: boolean = false

    containError: boolean = false
    messageError: string | undefined



    /***************************
            EFFORT
    ***************************/

    // NEW
    formNewEffort: FormGroup

    // UPDATE
    formUpdateEffort: FormGroup
    updateEffortContainError: boolean = false
    updateEffortMessageError: string | undefined



    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private effortService: EffortService, private kanbanService: KanbanService, private sprintService: SprintService, private projectService: ProjectService, private formBuilder: FormBuilder, private tokenService: TokenService) {
        this.formNewEffort = formBuilder.group({
            description: ['', []],
        })

        this.formUpdateEffort = formBuilder.group({
            description: ['', []],
            startDate: ['', [Validators.required]],
            endDate: ['', []],
        })
    }



    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit(): void {
        this.loadMyProjects()
    }

    inputClass(form: FormGroup, property: string) {
        if (form?.get(property)?.touched && form?.get(property)?.valid) {
            return "is-valid"
        } else if (form?.get(property)?.touched && form?.get(property)?.invalid) {
            return "is-invalid"
        } else {
            return ""
        }
    }

    returnPrincipalError(err: any) {
        var r = err.error.text
        if (r == undefined) {
            r = 'Error produced'
        }
        this.messageError = r;
        this.containError = true
    }

    getFormatedDateTimeLikeInput(date: Date) {
        return this.getFormatedDate(date, 'yyyy-MM-ddTHH:mm:ss')
    }

    loadActualDate() {
        let today = new Date()
        this.actualDate = this.getFormatedDateTimeLikeInput(today)
    }




    /***************************
        METHODS -> PROJECTS
    ***************************/

    loadMyProjects(): any {
        this.projectService.myProjects().subscribe(
            data => {
                this.myProjects = data
                this.containError = false
                this.projectSelectedId = this.projectService.getStoredProjectId()
                this.loadFirstProject()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    loadFirstProject() {
        if (this.myProjects.length !== 0) {
            let projectId = this.projectService.getStoredProjectId()
            if (projectId == null || projectId == 0) {
                this.projectService.setStoredProjectId(this.myProjects[0].id)
            }
            this.loadSprintsBySelectedProject()
        }
    }

    loadSprintsByProjectIdEvent(projectIdEvent: any) {
        let projectIdStr = projectIdEvent.value
        this.projectService.setStoredProjectId(Number(projectIdStr))
        this.loadSprintsBySelectedProject()
    }

    editIsAllowed(projectId: number) {
        let projects: Project[] = this.myProjects
        let selectedProject = projects.find(
            (a) => a.id === projectId
        )
        if (selectedProject != undefined) {

            let projectRoles: any = selectedProject.projectRoles

            this.adminAccess = projectRoles.some(
                (a: ProjectRole) => a.user.username == this.tokenService.getUsername() && [0, 1].includes(a.role)
            )

            this.memberAccess = projectRoles.some(
                (a: ProjectRole) => a.user.username == this.tokenService.getUsername() && [0, 1, 2].includes(a.role)
            )
        }
    }


    /***************************
        METHODS -> SPRINTS
    ***************************/

    loadSprintsBySelectedProject() {
        let projectId = this.projectService.getStoredProjectId()
        if (projectId != null && projectId != 0) {
            this.editIsAllowed(projectId)
            this.sprintService.sprintFromProject(projectId).subscribe(
                data => {
                    this.mySprints = data
                    this.containError = false
                    this.sprintSelectedId = this.sprintService.getStoredSprintId()
                    this.loadFirstSprint()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }

    loadFirstSprint() {
        if (this.mySprints.length !== 0) {
            let sprintId = this.sprintService.getStoredSprintId()
            if (sprintId == null || sprintId == 0) {
                this.sprintService.setStoredSprintId(this.mySprints[0].id)
            }
            this.loadTasksBySelectedSprint()
        }
    }

    loadKanbanBySprintIdEvent(sprintIdEvent: any) {
        let sprintIdStr = sprintIdEvent.value
        this.sprintService.setStoredSprintId(Number(sprintIdStr))
        this.loadTasksBySelectedSprint()
    }



    /***************************
        METHODS -> TASKS
    ***************************/

    loadTasksBySelectedSprint() {
        let sprintId = this.sprintService.getStoredSprintId()
        if (sprintId != null && sprintId != 0) {
            this.kanbanService.getAllKanbanTasksBySprintId(sprintId).subscribe(
                data => {
                    this.myTasks = data
                    this.containError = false
                    this.loadFirstTask()
                    this.kanbanTaskSelectedId = this.kanbanService.getStoredKanbanTaskId()
                    this.loadEfforts()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }

    loadFirstTask() {
        if (this.myTasks.length !== 0) {
            let taskId = this.kanbanService.getStoredKanbanTaskId()
            if (taskId == undefined && taskId == 0) {
                this.kanbanService.setStoredKanbanTaskId(this.myTasks[0].id)
            }
        }
    }

    loadTasksBySprintIdEvent(taskIdEvent: any) {
        let taskIdStr = taskIdEvent.value
        this.kanbanService.setStoredKanbanTaskId(Number(taskIdStr))
        this.loadTasksBySelectedSprint()
    }



    /***************************
        METHODS -> EFFORT
    ***************************/

    loadEfforts() {
        this.loadActiveEffort()
        this.effortService.getAllMyEfforts().subscribe(
            data => {
                this.containError = false
                this.efforts = data
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    loadActiveEffort() {
        this.effortService.getActiveEffort().subscribe(
            data => {
                this.activeEffort = data
                this.containError = false
                this.loadDescriptionOrTaskEffort()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    loadDescriptionOrTaskEffort() {
        if (this.activeEffort != null && this.activeEffort.kanbanTask == null && this.activeEffort.description != null && this.activeEffort.description != '') {
            this.changedToDescription = true
            this.formNewEffort = this.formBuilder.group({
                description: [this.activeEffort.description, []],
            })
        }
    }

    startEffort() {
        let newEffort: EffortStart
        let taskId = this.kanbanService.getStoredKanbanTaskId()
        if (this.changedToDescription || taskId == null) {
            newEffort = new EffortStart(this.formNewEffort.value.description, 0)
        } else {
            newEffort = new EffortStart("", taskId)
        }
        this.effortService.startEffort(newEffort).subscribe(
            data => {
                this.containError = false
                this.loadEfforts()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    fillUpdateForm(effort: Effort) {
        this.effortSelected = effort
        this.loadActualDate()

        this.formUpdateEffort = this.formBuilder.group({
            description: [effort.description, []],
            startDate: [this.getFormatedDateTimeLikeInput(effort.startDate), [Validators.required]],
            endDate: [this.getFormatedDateTimeLikeInput(effort.endDate), [Validators.required]],
        })

    }

    updateEffort() {
        if (this.effortSelected != undefined && this.effortSelected != null) {
            let kanbanTaskId: any = this.effortSelected.kanbanTask==null?0:this.effortSelected.kanbanTask.id
            let updateEffort: EffortUpdate = new EffortUpdate(this.effortSelected.id, this.formUpdateEffort.value.description, kanbanTaskId, new Date(this.formUpdateEffort.value.startDate), new Date(this.formUpdateEffort.value.endDate))
            this.effortService.updateEffort(updateEffort).subscribe(
                data => {
                    this.effortSelected = undefined
                    this.formUpdateEffort.reset()
                    this.closebuttonUpdateEffort.nativeElement.click()
                    this.updateEffortContainError = false
                    this.loadEfforts()
                },
                err => {
                    var r = err.error.text
                    if (r == undefined) {
                        r = 'Error produced'
                    }
                    this.updateEffortMessageError = r;
                    this.updateEffortContainError = true
                }
            )
        }

    }


    endEffort() {
        this.effortService.endEffort(this.activeEffort.id).subscribe(
            data => {
                this.containError = false
                this.loadEfforts()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    deleteEffort(effortId: number) {
        if (confirm("Are you sure to delete this effort?")) {
        this.effortService.deleteEffort(effortId).subscribe(
            data => {
                this.containError = false
                this.loadEfforts()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
        }
    }



    /***************************
       METHODS -> OTHERS
    ***************************/

    changeViewDescription() {
        this.changedToDescription = !this.changedToDescription
    }

    transformNumberToString(n: number, integers: number, fraction: number): string {
        return n.toLocaleString('en-US', {
            minimumIntegerDigits: integers,
            minimumFractionDigits: fraction
        })
    }

    getDifferenceFormatted(d1: any, d2: any): string {
        var time: number = Math.abs((new Date(d1)).getTime() - (new Date(d2)).getTime())
        return this.transformNumberToString(Math.floor(time / 3600000), 1, 0) + ':' + this.transformNumberToString((Math.floor(time / 60000)) % 60, 2, 0) + ':' + this.transformNumberToString((Math.floor(time / 1000)) % 60, 2, 0)
    }

    formatDate(date: Date): any {
        return this.getFormatedDate(date, 'dd/MM/yyyy')
    }

    formatTime(date: Date): any {
        return this.getFormatedDate(date, 'HH:mm:ss')
    }

    getFormatedDate(date: Date, format: string) {
        let datePipe = new DatePipe('en-US');
        return datePipe.transform(date, format);
    }
}