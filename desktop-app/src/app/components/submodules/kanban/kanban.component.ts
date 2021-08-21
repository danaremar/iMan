import { CdkDragDrop, transferArrayItem } from "@angular/cdk/drag-drop";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EffortStart } from "src/app/models/effort/effort";
import { KanbanColumnCreate, KanbanColumnShow, KanbanColumnUpdate } from "src/app/models/kanban/kanbanColumn";
import { KanbanTask, KanbanTaskCreate, KanbanTaskMove, KanbanTaskUpdate } from "src/app/models/kanban/kanbanTask";
import { Project } from "src/app/models/project/project";
import { ProjectRole } from "src/app/models/project/roles";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";

@Component({
    selector: 'iMan-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.css']
})
export class KanbanComponent implements OnInit {

    @ViewChild('closebuttonCreateColumn') closebuttonCreateColumn: any;
    @ViewChild('closebuttonUpdateColumn') closebuttonUpdateColumn: any;
    @ViewChild('closebuttonCreateTask') closebuttonCreateTask: any;
    @ViewChild('closebuttonUpdateTask') closebuttonUpdateTask: any;

    /***************************
            GENERAL
    ***************************/

    myProjects: any
    mySprints: any
    adminAccess: boolean = false
    memberAccess: boolean = false
    projectSelectedId: number | null | undefined
    sprintSelectedId: number | null | undefined
    kanbanColumnSelected: any
    kanbanTaskSelected: any
    kanban: any
    activeEffort: any

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

    constructor(private effortService: EffortService, private kanbanService: KanbanService, private sprintService: SprintService, private projectService: ProjectService, private formBuilder: FormBuilder, private tokenService: TokenService) {

        // COLUMNS
        this.formNewColumn = formBuilder.group({
            title: ['', [Validators.required]]
        })
        this.formUpdateColumn = formBuilder.group({
            title: ['', [Validators.required]],
            columnOrder: ['', [Validators.required]],
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
        if (sprintId != null && sprintId != 0) {
            this.kanbanService.getAllKanbanBySprintId(sprintId).subscribe(
                data => {
                    this.loadActiveEffort()
                    this.kanban = data
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }



    /***************************
        METHODS -> EFFORT
    ***************************/

    loadActiveEffort() {
        this.effortService.getActiveEffort().subscribe(
            data => {
                this.activeEffort = data
                if (data != null) {
                    if (data.project != null) this.projectService.setStoredProjectId(data.project.id)
                    if (data.sprint != null) this.sprintService.setStoredSprintId(data.sprint.id)
                    if (data.kanbanTask != null) this.kanbanService.setStoredKanbanTaskId(data.kanbanTask.id)
                }
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    startEffort(kanbanTaskId: number) {
        let newEffort: EffortStart = new EffortStart("", kanbanTaskId)
        this.effortService.startEffort(newEffort).subscribe(
            data => {
                this.loadKanbanBySelectedSprint()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    endEffort() {
        this.effortService.endEffort(this.activeEffort.id).subscribe(
            data => {
                this.loadKanbanBySelectedSprint()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }



    /***************************
        METHODS -> COLUMNS
    ***************************/

    newColumn() {
        let sprintId = this.sprintService.getStoredSprintId()
        if (sprintId != null && sprintId != 0) {
            let newColumn: KanbanColumnCreate = new KanbanColumnCreate(this.formNewColumn.value.title, sprintId)
            this.kanbanService.createKanbanColumn(newColumn).subscribe(
                res => {
                    this.formNewColumn.reset()
                    this.closebuttonCreateColumn.nativeElement.click()
                    this.loadKanbanBySelectedSprint()
                },
                err => {
                    var r = err.error.text
                    if (r == undefined) {
                        r = 'Error produced'
                    }
                    this.newColumnMessageError = r;
                    this.newColumnContainError = true
                }
            )
        }
    }

    fillColumnUpdateForm(kanbanColumn: KanbanColumnShow) {
        this.kanbanColumnSelected = kanbanColumn

        this.formUpdateColumn = this.formBuilder.group({
            title: [kanbanColumn.title, [Validators.required]],
            columnOrder: [kanbanColumn.columnOrder, [Validators.required]],
        })
    }

    editColumn() {
        let updateColumn: KanbanColumnUpdate = new KanbanColumnUpdate(this.kanbanColumnSelected.id, this.formUpdateColumn.value.title, this.formUpdateColumn.value.columnOrder)
        this.kanbanService.updateKanbanColumn(updateColumn).subscribe(
            res => {
                this.formUpdateColumn.reset()
                this.closebuttonUpdateColumn.nativeElement.click()
                this.loadKanbanBySelectedSprint()
            },
            err => {
                var r = err.error.text
                if (r == undefined) {
                    r = 'Error produced'
                }
                this.updateColumnMessageError = r;
                this.updateColumnContainError = true
            }
        )
    }

    disableColumn(kanbanColumn: any) {
        if (confirm("Are you sure to delete " + kanbanColumn.title + '?')) {
            this.kanbanService.disableKanbanColumn(kanbanColumn.id).subscribe(
                res => {
                    this.containError = false
                    this.loadKanbanBySelectedSprint()
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

    newTask() {
        let createTask: KanbanTaskCreate = new KanbanTaskCreate(this.formNewTask.value.title, this.formNewTask.value.description, this.formNewTask.value.estimatedTime, this.kanbanColumnSelected.id)
        this.kanbanService.createKanbanTask(createTask).subscribe(
            res => {
                this.formNewTask.reset()
                this.closebuttonCreateTask.nativeElement.click()
                this.loadKanbanBySelectedSprint()
            },
            err => {
                var r = err.error.text
                if (r == undefined) {
                    r = 'Error produced'
                }
                this.newTaskMessageError = r;
                this.newTaskContainError = true
            }
        )
    }

    fillTaskUpdateForm(kanbanTask: KanbanTask) {
        this.kanbanTaskSelected = kanbanTask

        this.formUpdateTask = this.formBuilder.group({
            title: [kanbanTask.title, [Validators.required]],
            description: [kanbanTask.description, []],
            estimatedTime: [kanbanTask.estimatedTime, []],
        })
    }

    editTask() {
        let updateTask: KanbanTaskUpdate = new KanbanTaskUpdate(this.kanbanTaskSelected.id, this.formUpdateTask.value.title, this.formUpdateTask.value.description, this.formUpdateTask.value.estimatedTime)
        this.kanbanService.updateKanbanTask(updateTask).subscribe(
            res => {
                this.formUpdateTask.reset()
                this.closebuttonUpdateTask.nativeElement.click()
                this.loadKanbanBySelectedSprint()
            },
            err => {
                var r = err.error.text
                if (r == undefined) {
                    r = 'Error produced'
                }
                this.updateTaskMessageError = r;
                this.updateTaskContainError = true
            }
        )
    }

    disableTask(kanbanTask: any) {
        if (confirm("Are you sure to delete #" + kanbanTask.number + ' ' + kanbanTask.title + '?')) {
            this.kanbanService.disableKanbanTask(kanbanTask.id).subscribe(
                res => {
                    this.containError = false
                    this.loadKanbanBySelectedSprint()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }


    /***************************
       METHODS -> DRAG & DROP
    ***************************/

    dropColumn(event: CdkDragDrop<any>) {
        if (event.container && event.previousContainer) {
            let kanbanColumnUpdate: KanbanColumnUpdate = new KanbanColumnUpdate(event.item.data.id, event.item.data.title, event.currentIndex)

            this.kanbanService.updateKanbanColumn(kanbanColumnUpdate).subscribe(
                data => {
                    this.containError = false
                    transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);

                    this.loadKanbanBySelectedSprint()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }

    dropTask(event: CdkDragDrop<any>) {
        if (event.container && event.previousContainer) {
            let newPosition = event.currentIndex
            let kanbanTaskMove: KanbanTaskMove = new KanbanTaskMove(event.item.data.id, event.container.data.id, newPosition)

            this.kanbanService.moveKanbanTask(kanbanTaskMove).subscribe(
                data => {
                    this.containError = false
                    this.loadKanbanBySelectedSprint()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }

}