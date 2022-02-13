import { DatePipe } from "@angular/common"
import { Injectable } from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms"
import { Project } from "src/app/models/project/project"
import { ProjectRole } from "src/app/models/project/roles"
import { Sprint } from "src/app/models/sprint/sprint"
import { ShowUser } from "src/app/models/user/show-user"
import { TokenService } from "src/app/services/authentication/token.service"
import { EffortService } from "src/app/services/effort/effort.service"
import { KanbanService } from "src/app/services/kanban/kanban.service"
import { ProjectService } from "src/app/services/projects/project.service"
import { SprintService } from "src/app/services/sprints/sprint.service"

@Injectable()
export class ImanSubmodule {

    myProjects: Array<Project> = []
    mySprints: Array<Sprint> = []
    myTasks: any
    kanban: any
    efforts: any

    usersInProject: Array<ShowUser> = []

    actualDate: any

    projectSelectedId: number | null | undefined
    sprintSelectedId: number | null | undefined
    kanbanTaskSelectedId: number | null | undefined

    activeEffort: any

    adminAccess: boolean = false
    memberAccess: boolean = false

    containError: boolean = false
    messageError: string | undefined

    constructor(public effortService: EffortService, public kanbanService: KanbanService, public sprintService: SprintService, public projectService: ProjectService, public formBuilder: FormBuilder, public tokenService: TokenService) { }

    /***************************
            GENERAL
    ***************************/

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


    /***************************
        METHODS -> PROJECTS
    ***************************/

    ngOnInit(): void {
        this.loadMyProjects()
    }

    loadMyProjects(): any {
        this.projectService.myProjects().subscribe(
            data => {
                this.myProjects = data
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
            this.getAllUsersFromSelectedProject()
        }
    }

    loadSprintsByProjectIdEvent(projectIdEvent: any) {
        let projectIdStr = projectIdEvent.value
        this.projectService.setStoredProjectId(Number(projectIdStr))
        this.sprintService.setStoredSprintId(0)
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
                    if(this.mySprints!=undefined && this.mySprints.length==0){
                        this.sprintService.setStoredSprintId(0)
                        this.myTasks = null
                        this.kanban = null
                    }
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
            this.loadKanbanBySelectedSprint()
            this.loadTasksBySelectedSprint()
        }
    }

    loadKanbanBySprintIdEvent(sprintIdEvent: any) {
        let sprintIdStr = sprintIdEvent.value
        this.sprintService.setStoredSprintId(Number(sprintIdStr))
        this.loadKanbanBySelectedSprint()
    }

    loadKanbanBySelectedSprint() {
        let sprintId = this.sprintService.getStoredSprintId()
        if (sprintId != null && sprintId != 0) {
            this.kanbanService.getAllKanbanBySprintId(sprintId).subscribe(
                data => {
                    this.kanban = data
                    this.loadActiveEffort()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }


    /***************************
        METHODS -> TASKS
    ***************************/

    loadTasksBySprintIdEvent(taskIdEvent: any) {
        let taskIdStr = taskIdEvent.value
        this.kanbanService.setStoredKanbanTaskId(Number(taskIdStr))
        this.myTasks = null
        this.kanbanService.setStoredKanbanTaskId(0)
        this.loadTasksBySelectedSprint()
    }

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
            if (taskId == undefined || taskId == 0) {
                this.kanbanService.setStoredKanbanTaskId(this.myTasks[0].id)
            }
        }
    }


    /***************************
        METHODS -> EFFORT
    ***************************/

    loadActiveEffort() {
        this.effortService.getActiveEffort().subscribe(
            data => {
                this.containError = false
                this.activeEffort = data
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

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

    /***************************
        AUXILIAR: TIME
    ***************************/

    getFormatedDateTimeLikeInput(date: Date) {
        return this.getFormatedDate(date, 'yyyy-MM-ddTHH:mm:ss')
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

    loadActualDate() {
        let dtToday = new Date()

        let month: string = String(dtToday.getMonth() + 1)
        let day: string = String(dtToday.getDate())
        let year: string = String(dtToday.getFullYear())

        if (Number(month) < 10)
            month = '0' + month.toString();
        if (Number(day) < 10)
            day = '0' + day.toString();

        this.actualDate = year + '-' + month + '-' + day;
    }


    /***************************
        AUXILIAR: ROLE
    ***************************/

    getKeyByValue(object: any, value: any) {
        return Object.keys(object).find(key => object[key] === value);
    }

    getRole(role: number) {
        switch (role) {
            case 0: return 'Owner'
            case 1: return 'Admin'
            case 2: return 'Member'
            default: return 'Visitor'
        }
    }


    /***************************
        AUXILIAR: USERS IN PROJECT
    ***************************/

    getAllUsersFromSelectedProject() {
        if (this.projectSelectedId) {
            let project: Project | undefined = this.myProjects.find(x => x.id==this.projectSelectedId)
            if(project != undefined) {
                this.usersInProject = project.projectRoles.map(x => x.user)
            }   
        }
    }
}