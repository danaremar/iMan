import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EffortStart } from "src/app/models/effort/effort";
import { KanbanColumn, KanbanColumnCreate, KanbanColumnShow, KanbanColumnUpdate } from "src/app/models/kanban/kanbanColumn";
import { KanbanTask, KanbanTaskChildrens, KanbanTaskMove } from "src/app/models/kanban/kanbanTask";
import { ShowUser } from "src/app/models/user/show-user";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { UserService } from "src/app/services/user/user.service";
import { ImanSubmodule } from "../submodule.component";

@Component({
    selector: 'iMan-kanban',
    templateUrl: './kanban.component.html',
    styleUrls: ['./kanban.component.css']
})
export class KanbanComponent extends ImanSubmodule implements OnInit {

    @ViewChild('closebuttonCreateColumn') closebuttonCreateColumn: any;
    @ViewChild('closebuttonUpdateColumn') closebuttonUpdateColumn: any;
    @ViewChild('closebuttonCreateTask') closebuttonCreateTask: any;
    @ViewChild('closebuttonUpdateTask') closebuttonUpdateTask: any;

    /***************************
            GENERAL
    ***************************/

    kanbanColumnSelected: any
    kanbanTaskSelected: any


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

    myTasks: KanbanTask[] = []

    // ASSIGNATIONS
    assignedUsers: Array<ShowUser> = []

    // CHILDRENS
    selectedChildrens: Array<KanbanTaskChildrens> = []

    // TASK: MODAL
    @ViewChild('openTaskModal') openTaskModal: any
    selectedTask: KanbanTask | undefined
    selectedColumnId: number | undefined
    taskIsEditing: boolean = false


    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService, private userService: UserService) {


        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)
        // COLUMNS
        this.formNewColumn = formBuilder.group({
            title: ['', [Validators.required]]
        })
        this.formUpdateColumn = formBuilder.group({
            title: ['', [Validators.required]],
            columnOrder: ['', [Validators.required]],
        })

    }


    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit(): void {
        this.loadKanban = true
        this.loadTasks = true
        this.loadMyProjects()
    }



    /***************************
        METHODS -> EFFORT
    ***************************/

    startEffort(kanbanTaskId: number) {
        let newEffort: EffortStart = new EffortStart("", kanbanTaskId)
        this.effortService.startEffort(newEffort).subscribe({
            next: (n) => {
                this.containError = false
                this.loadKanbanBySelectedSprint()
            },
            error: (e) => {
                this.returnPrincipalError(e)
            }
        })
    }

    endEffort() {
        this.effortService.endEffort(this.activeEffort.id).subscribe({
            next: (n) => {
                this.containError = false
                this.loadKanbanBySelectedSprint()
            },
            error: (e) => {
                this.returnPrincipalError(e)
            }
        })
    }



    /***************************
        METHODS -> COLUMNS
    ***************************/

    newColumn() {
        let sprintId = this.sprintService.getStoredSprintId()
        if (sprintId != null && sprintId != 0) {
            let newColumn: KanbanColumnCreate = new KanbanColumnCreate(this.formNewColumn.value.title, sprintId)
            this.kanbanService.createKanbanColumn(newColumn).subscribe({
                next: (n) => {
                    this.formNewColumn.reset()
                    this.closebuttonCreateColumn.nativeElement.click()
                    this.loadKanbanBySelectedSprint()
                },
                error: (e) => {
                    let r = e.error.text
                    if (r == undefined) {
                        r = 'Error produced'
                    }
                    this.newColumnMessageError = r;
                    this.newColumnContainError = true
                }
            })
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
        this.kanbanService.updateKanbanColumn(updateColumn).subscribe({
            next: (n) => {
                this.formUpdateColumn.reset()
                this.closebuttonUpdateColumn.nativeElement.click()
                this.loadKanbanBySelectedSprint()
            },
            error: (e) => {
                let r = e.error.text
                if (r == undefined) {
                    r = 'Error produced'
                }
                this.updateColumnMessageError = r;
                this.updateColumnContainError = true
            }
        })
    }

    disableColumn(kanbanColumn: any) {
        if (confirm("Are you sure to disable " + kanbanColumn.title + '?')) {
            this.kanbanService.disableKanbanColumn(kanbanColumn.id).subscribe({
                next: (n) => {
                    this.containError = false
                    this.loadKanbanBySelectedSprint()
                },
                error: (e) => {
                    this.returnPrincipalError(e)
                }
            })
        }
    }

    /***************************
        METHODS -> TASKS
    ***************************/

    reloadTaskAttributes() {
        this.assignedUsers = []
        this.selectedChildrens = []
    }


    // TASKS

    showTask(kanbanTask: KanbanTask, kanbanColumn: KanbanColumn) {
        if (kanbanTask != undefined && kanbanColumn != undefined) {
            this.selectedTask = kanbanTask
            this.selectedColumnId = kanbanColumn.id
        }
        this.taskIsEditing = false
        this.openTaskModal.nativeElement.click()
    }

    newTask(kanbanColumn: KanbanColumn) {
        if (kanbanColumn != undefined) {
            this.selectedColumnId = kanbanColumn.id
        }
        this.selectedTask = undefined
        this.taskIsEditing = true
        this.openTaskModal.nativeElement.click()
    }

    editTask(kanbanTask: KanbanTask, kanbanColumn: KanbanColumn) {
        if (kanbanTask != undefined) {
            this.selectedTask = kanbanTask
            this.selectedColumnId = kanbanColumn.id
        }
        this.taskIsEditing = true
        this.openTaskModal.nativeElement.click()
    }

    disableTask(kanbanTask: any) {
        if (confirm("Are you sure to disable #" + kanbanTask.number + ' ' + kanbanTask.title + '?')) {
            this.kanbanService.disableKanbanTask(kanbanTask.id).subscribe({
                next: (e) => {
                    this.containError = false
                    this.loadKanbanBySelectedSprint()
                },
                error: (e) => {
                    this.returnPrincipalError(e)
                }
            })
        }
    }



    /***************************
       METHODS -> DRAG & DROP
    ***************************/

    updateTemporallyDragDrop(event: CdkDragDrop<any>) {

        // get column
        let old_column = this.kanban.filter((x: { id: number; }) => x.id == (event.previousContainer.data.id))[0]

        // saved task
        let task = old_column.tasks[event.previousIndex]

        // delete previous
        old_column.tasks.splice(event.previousIndex, 1)

        // add new
        let new_column = this.kanban.filter((x: { id: number; }) => x.id == (event.container.data.id))[0]
        new_column.tasks.splice(event.currentIndex, 0, task)
    }

    dropTask(event: CdkDragDrop<any>) {

        // Update view (backend takes some time and task return to previous position)
        // Cannot be done by moveItemInArray() or transferArrayItem()
        this.updateTemporallyDragDrop(event)

        // BACKEND
        let kanbanTaskMove: KanbanTaskMove = new KanbanTaskMove(event.item.data.id, event.container.data.id, event.currentIndex)
        this.kanbanService.moveKanbanTask(kanbanTaskMove).subscribe({
            next: (n) => {
                this.containError = false
                this.loadKanbanBySelectedSprint()
            },
            error: (e) => {
                this.returnPrincipalError(e)
            }
        })
    }


    /***************************
       METHODS -> IMAGE
    ***************************/

    public getProfileImageUrlFromUser(user: ShowUser): any {
        return this.userService.getUrlFromProfile(user.imageUid)
    }

}