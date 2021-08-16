import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { EffortStart } from "src/app/models/effort/effort";
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
    kanbanTaskSelectedId: any
    adminAccess: boolean = false
    memberAccess: boolean = false
    efforts: any

    activeEffort: any
    changedToDescription: boolean = false

    containError: boolean = false
    messageError: string | undefined



    /***************************
            EFFORT
    ***************************/

    // NEW
    formNewEffort: FormGroup
    newEffortContainError: boolean = false
    newEffortMessageError: string | undefined

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



    /***************************
        METHODS -> PROJECTS
    ***************************/

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
                    this.kanbanTaskSelectedId = this.kanbanService.getStoredKanbanTaskId()
                    this.loadActiveEffort()
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
            if (taskId == null && taskId == 0) {
                this.sprintService.setStoredSprintId(this.mySprints[0].id)
            }
            this.loadTasksBySelectedSprint()
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
        this.effortService.getAllMyEfforts().subscribe(
            data => {
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
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    startEffort() {
        let newEffort: EffortStart = new EffortStart("", this.kanbanTaskSelectedId)
        this.effortService.startEffort(newEffort).subscribe(
            data => {
                this.loadMyProjects()

                // TODO
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    endEffort() {
        this.effortService.endEffort(this.activeEffort.id).subscribe(
            data => {
                this.loadMyProjects()

                // TODO
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }


    /***************************
       METHODS -> CHANGE VIEW
    ***************************/

    changeViewDescription(){
        this.changedToDescription = !this.changedToDescription
    }
}