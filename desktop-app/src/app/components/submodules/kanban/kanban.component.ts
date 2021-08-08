import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Project } from "src/app/models/project/project";
import { ProjectRole } from "src/app/models/project/roles";
import { TokenService } from "src/app/services/authentication/token.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";

@Component({
    selector: 'iMan-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

    /***************************
            GENERAL
    ***************************/

    myProjects: any
    mySprints: any
    adminAccess: boolean = false
    memberAccess: boolean = false
    projectSelectedId: number | null | undefined
    sprintSelectedId: number | null | undefined
    kanban: any

    containError: boolean = false
    messageError: string | undefined


    /***************************
            COLUMNS
    ***************************/

    // NEW
    formNewColumn: FormGroup
    newColumnContainError: boolean = false
    newColumnMessageError: string | undefined

    // UPDATE
    formUpdateColumn: FormGroup
    updateColumnContainError: boolean = false
    updateColumnMessageError: string | undefined


    /***************************
            TASKS
    ***************************/

    // NEW
    formNewTask: FormGroup
    newTaskContainError: boolean = false
    newTaskMessageError: string | undefined

    // UPDATE
    formUpdateTask: FormGroup
    updateTaskContainError: boolean = false
    updateTaskMessageError: string | undefined


    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private kanbanService: KanbanService, private sprintService: SprintService, private projectService: ProjectService, private formBuilder: FormBuilder, private tokenService: TokenService) {

        // COLUMNS
        this.formNewColumn = formBuilder.group({
            title: ['', [Validators.required]]
        })
        this.formUpdateColumn = formBuilder.group({
            title: ['', [Validators.required]]
        })

        // TASKS
        this.formNewTask = formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []],
            estimatedTime: ['', []],
        })
        this.formUpdateTask = formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []],
            estimatedTime: ['', []],
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
            this.loadKanbanBySelectedSprint()
        }
    }

    loadKanbanBySprintIdEvent(sprintIdEvent: any) {
        let sprintIdStr = sprintIdEvent.value
        this.sprintService.setStoredSprintId(Number(sprintIdStr))
        this.loadKanbanBySelectedSprint()
    }

    loadKanbanBySelectedSprint() {
        let sprintId = this.sprintService.getStoredSprintId()
        if (sprintId != null && sprintId != 0){
            this.kanbanService.getAllKanbanBySprintId(sprintId).subscribe(
                data => {
                    this.kanban = data
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }


    /***************************
        METHODS -> COLUMNS
    ***************************/



    /***************************
        METHODS -> TASKS
    ***************************/

}