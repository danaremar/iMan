import { CdkDragDrop } from "@angular/cdk/drag-drop";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { EffortStart } from "src/app/models/effort/effort";
import { KanbanColumnCreate, KanbanColumnShow, KanbanColumnUpdate } from "src/app/models/kanban/kanbanColumn";
import { KanbanTask, KanbanTaskChildrens, KanbanTaskCreate, KanbanTaskMove, KanbanTaskUpdate } from "src/app/models/kanban/kanbanTask";
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

    formAddAssignedUser: FormGroup
    formAddChildrenTask: FormGroup


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

    // ASSIGNATIONS
    assignedUsers: Array<ShowUser> = []

    // CHILDRENS
    selectedChildrens: Array<KanbanTaskChildrens> = []


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

        // TASKS
        this.formNewTask = formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []],
            estimatedTime: ['', []],
            importance: ['', []],
            dueStartDate: ['', []],
            dueEndDate: ['', []]
        })
        this.formUpdateTask = formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []],
            estimatedTime: ['', []],
            importance: ['', []],
            dueStartDate: ['', []],
            dueEndDate: ['', []]
        })

        // ADD ASSIGNED USER
        this.formAddAssignedUser = formBuilder.group({
            username: ['', []]
        })

        // ADD CHILDREN TASK
        this.formAddChildrenTask = formBuilder.group({
            children: ['', []]
        })

    }


    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit(): void {
        this.loadMyProjects()
    }



    /***************************
        METHODS -> EFFORT
    ***************************/

    startEffort(kanbanTaskId: number) {
        let newEffort: EffortStart = new EffortStart("", kanbanTaskId)
        this.effortService.startEffort(newEffort).subscribe(
            data => {
                this.containError = false
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
                this.containError = false
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
        if (confirm("Are you sure to disable " + kanbanColumn.title + '?')) {
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

    reloadTaskAttributes() {
        this.assignedUsers = []
        this.selectedChildrens = []
        this.formAddAssignedUser.reset()
        this.formAddChildrenTask.reset()
    }

    //USERS

    addAssignedUsername() {
        var username = this.formAddAssignedUser.value.username
        var u = this.usersInProject.find(x => x.username == username)
        if (u !== undefined && this.assignedUsers.indexOf(u)==-1) {
            this.assignedUsers.push(u)
            this.formAddAssignedUser.reset()
        }
    }

    removeAssignedUsername(i: number) {
        this.assignedUsers.splice(i, 1)
    }

    getUsernamesInArray(lsUsers: Array<ShowUser>): Array<string> {
        return lsUsers.map(x => { return x.username })
    }

    // CHILDRENS

    addChildrenTask() {
        var children: number = this.formAddChildrenTask.value.children
        var c = this.myTasks.find((x: KanbanTask) => x.id == children)
        if(c!==undefined && this.selectedChildrens.indexOf(c)==-1){
            this.selectedChildrens.push(c)
            this.formAddChildrenTask.reset()
        }
    }

    removeChildrenTask(i: number) {
        this.selectedChildrens.splice(i, 1)
    }

    getChildrenIdsInArray(lsChildren: Array<KanbanTaskChildrens>): Array<number> {
        return lsChildren.map(x => { return x.id })
    }

    // NEW TASK

    newTask() {
        let createTask: KanbanTaskCreate = new KanbanTaskCreate(this.formNewTask.value.title, this.formNewTask.value.description, this.formNewTask.value.estimatedTime, this.kanbanColumnSelected.id, this.formNewTask.value.importance, this.formNewTask.value.dueStartDate, this.formNewTask.value.dueEndDate,this.getUsernamesInArray(this.assignedUsers), this.getChildrenIdsInArray(this.selectedChildrens))
        this.kanbanService.createKanbanTask(createTask).subscribe(
            res => {
                this.formNewTask.reset()
                this.closebuttonCreateTask.nativeElement.click()
                this.loadKanbanBySelectedSprint()
                this.reloadTaskAttributes()
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

    // UPDATE TASK

    fillTaskUpdateForm(kanbanTask: KanbanTask) {
        this.kanbanTaskSelected = kanbanTask
        this.assignedUsers = kanbanTask.assignedUsers
        this.selectedChildrens = kanbanTask.children
        this.formUpdateTask = this.formBuilder.group({
            title: [kanbanTask.title, [Validators.required]],
            description: [kanbanTask.description, []],
            estimatedTime: [kanbanTask.estimatedTime, []],
        })
    }

    editTask() {
        let updateTask: KanbanTaskUpdate = new KanbanTaskUpdate(this.kanbanTaskSelected.id, this.formUpdateTask.value.title, this.formUpdateTask.value.description, this.formUpdateTask.value.estimatedTime, this.formUpdateTask.value.importance, this.formUpdateTask.value.dueStartDate, this.formUpdateTask.value.dueEndDate, this.getUsernamesInArray(this.assignedUsers), this.getChildrenIdsInArray(this.selectedChildrens))
        this.kanbanService.updateKanbanTask(updateTask).subscribe(
            res => {
                this.formUpdateTask.reset()
                this.closebuttonUpdateTask.nativeElement.click()
                this.loadKanbanBySelectedSprint()
                this.reloadTaskAttributes()
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
        if (confirm("Are you sure to disable #" + kanbanTask.number + ' ' + kanbanTask.title + '?')) {
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

    updateTemporallyDragDrop(event: CdkDragDrop<any>) {
        // saved task
        var task = this.kanban[event.previousContainer.data.id - 1].tasks[event.previousIndex]

        // delete previous
        this.kanban[event.previousContainer.data.id - 1].tasks.splice(event.previousIndex, 1)

        // add new
        this.kanban[event.container.data.id - 1].tasks.splice(event.currentIndex, 0, task)
    }

    dropTask(event: CdkDragDrop<any>) {

        // Update view (backend takes some time and task return to previous position)
        // Cannot be done by moveItemInArray() or transferArrayItem()
        this.updateTemporallyDragDrop(event)

        // BACKEND
        let kanbanTaskMove: KanbanTaskMove = new KanbanTaskMove(event.item.data.id, event.container.data.id, event.currentIndex)
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


    /***************************
       METHODS -> IMAGE
    ***************************/

    public getProfileImageUrlFromUser(user: ShowUser): any {
        return this.userService.getUrlFromProfile(user.imageUid)
    }

}