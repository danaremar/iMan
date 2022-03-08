import { DatePipe } from "@angular/common";
import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { KanbanTask, KanbanTaskChildrens, KanbanTaskCreate, KanbanTaskUpdate } from "src/app/models/kanban/kanbanTask";
import { ShowUser } from "src/app/models/user/show-user";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { UserService } from "src/app/services/user/user.service";


@Component({
    selector: 'task-modal-view',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.css']
})
export class TaskComponent implements OnInit {

    // user can edit?
    @Input()
    isEditable: boolean = false

    // selected task
    @Input()
    selectedTask: KanbanTask | undefined

    // all users in selected project
    @Input()
    usersInProject: Array<ShowUser> = []

    @Input()
    selectedKanbanColumnId: number = 0

    // all my tasks in the sprint
    @Input()
    myTasks: Array<KanbanTask> = []

    // is editing right now?
    @Input()
    isEditing: boolean = false

    // error messages
    containError: boolean = false
    messageError: string | undefined

    // form
    formTask: FormGroup

    // close modal button
    @ViewChild('closeButtonTask') closeButtonTask: any

    // ASSIGNATIONS
    assignedUsers: Array<ShowUser> = []

    // CHILDRENS
    selectedChildrens: Array<KanbanTaskChildrens> = []

    // OTHER FORMS
    formAddAssignedUser: FormGroup
    formAddChildrenTask: FormGroup

    constructor(public userService: UserService, public formBuilder: FormBuilder, public kanbanService: KanbanService) {

        // CREATE / UPDATE TASK
        this.formTask = formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []],
            estimatedTime: ['', []],
            tags: ['', []],
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


    ngOnInit(): void {
        // NOTHING
    }

    /***************************
        METHODS -> GENERAL
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

    edit() {
        this.isEditing = !this.isEditing
        if(this.isEditing) {
            this.buildForm()
        }
    }

    buildForm() {
        this.formTask.reset()
        if (this.selectedTask != undefined) {
            this.formTask = this.formBuilder.group({
                title: [this.selectedTask.title, [Validators.required]],
                description: [this.selectedTask.description, []],
                estimatedTime: [this.selectedTask.estimatedTime, []],
                importance: [this.selectedTask.importance, []],
                tags: [this.selectedTask.tags, []],
                dueStartDate: [this.selectedTask.dueStartDate, []],
                dueEndDate: [this.selectedTask.dueEndDate, []]
            })
        }
    }


    /***************************
        METHODS -> UPLOAD
    ***************************/

    uploadTask() {

        // CREATE
        if (this.selectedTask == undefined) {
            this.newTask()

            // UPDATE
        } else {
            this.editTask()
        }
    }


    /***************************
        METHODS -> CREATE
    ***************************/

    newTask() {
        if (this.selectedChildrens) {
            let createTask: KanbanTaskCreate = new KanbanTaskCreate(this.formTask.value.title, this.formTask.value.description, this.formTask.value.estimatedTime, this.selectedKanbanColumnId, this.formTask.value.tags, this.formTask.value.importance, this.formTask.value.dueStartDate, this.formTask.value.dueEndDate, this.getUsernamesInArray(this.assignedUsers), this.getChildrenIdsInArray(this.selectedChildrens))
            this.kanbanService.createKanbanTask(createTask).subscribe({
                next: (n) => {
                    this.handleNext(n)
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }

    /***************************
        METHODS -> UPDATE
    ***************************/

    editTask() {
        if (this.selectedTask != undefined) {
            let updateTask: KanbanTaskUpdate = new KanbanTaskUpdate(this.selectedTask.id, this.formTask.value.title, this.formTask.value.description, this.formTask.value.estimatedTime, this.formTask.value.tags, this.formTask.value.importance, this.formTask.value.dueStartDate, this.formTask.value.dueEndDate, this.getUsernamesInArray(this.assignedUsers), this.getChildrenIdsInArray(this.selectedChildrens))
            this.kanbanService.updateKanbanTask(updateTask).subscribe({
                next: (n) => {
                    this.handleNext(n)
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }

    /***************************
        METHODS -> HANDLERS
    ***************************/

    clearForms() {
        this.formTask.reset()
        this.formAddAssignedUser.reset()
        this.formAddChildrenTask.reset()
    }

    handleNext(n: any) {
        this.selectedTask = n
        this.clearForms()
        this.edit()
    }

    handleError(e: any) {
        var r = e.error.text
        if (r == undefined) {
            r = 'Error produced'
        }
        this.messageError = r;
        this.containError = true
    }

    /***************************
        METHODS -> AUXILIAR
    ***************************/

    // TIME
    timeToDoubleString(number: number): string {
        if (number == null) number = 0
        return (number % 1 ? number.toFixed(3) : number) + ''
    }

    // DATES
    getFormatedDate(date: Date, format: string) {
        let datePipe = new DatePipe('en-US');
        return datePipe.transform(date, format);
    }

    // PROFILE IMAGE

    public getProfileImageUrlFromUser(user: ShowUser): any {
        return this.userService.getUrlFromProfile(user.imageUid)
    }

    // USERS

    addAssignedUsername() {
        var username = this.formAddAssignedUser.value.username
        var u = this.usersInProject.find(x => x.username == username)
        if (u !== undefined && this.assignedUsers.indexOf(u) == -1) {
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
        if (c !== undefined && this.selectedChildrens.indexOf(c) == -1) {
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

}