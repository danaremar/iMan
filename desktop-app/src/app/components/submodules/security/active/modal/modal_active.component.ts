import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActiveCreateDto, ActiveListDto, ActiveShowChildrenDto, ActiveShowDto, ActiveUpdateDto } from "src/app/models/actives/actives";
import { ActiveUsersCreateDto, ActiveUsersShowDto } from "src/app/models/actives/user-actives";
import { ShowUser } from "src/app/models/user/show-user";
import { ActiveService } from "src/app/services/actives/actives.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: 'active-modal-view',
    templateUrl: './modal_active.component.html',
    styleUrls: ['./modal_active.component.css']
})
export class ModalActive implements OnInit {

    // user can edit?
    @Input()
    isEditable: boolean = false

    // selected active
    @Input()
    selectedActive: ActiveShowDto | undefined

    // selected project id
    @Input()
    projectId: number | undefined | null

    // is editing right now?
    @Input()
    isEditing: boolean = false

    // emit one event to reload
    @Output()
    reload = new EventEmitter<boolean>()

    // error messages
    containError: boolean = false
    messageError: string | undefined

    // form
    formActive: FormGroup
    formAddChild: FormGroup
    formAddUserAssignation: FormGroup

    // search
    searchChildren: Array<ActiveShowChildrenDto> = []

    // close modal button
    @ViewChild('closeModalActive') closeModalActive: any

    // CHILDRENS
    assignedChildrens: Array<ActiveListDto> = []

    // USERS
    @Input()
    usersInProject: Array<ShowUser> = []

    constructor(public userService: UserService, public formBuilder: FormBuilder, public activeService: ActiveService) {
        this.formActive = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', []],
            type: ['', []],
            company: ['', []],
            product: ['', []],
            version: ['', []],
            cpeType: ['', []],
            cpe: ['', []],
            importance: ['', []],
            startAdquisition: ['', []],
            endAdquisition: ['', []],
            endOfLife: ['', []],
            cost: ['', []],
            periodicity: ['', []],
            subscriptionType: ['', []],
            location: ['', []],
            children: this.formBuilder.array([]),
            activeUsers: this.formBuilder.array([]),
        })
        this.formAddChild = this.formBuilder.group({
            children: ['', []]
        })
        this.formAddUserAssignation = this.formBuilder.group({
            username: ['', []],
            imageUid: ['', []],
            status: ['', []],
            serial: ['', []],
            notes: ['', []],
            ips: ['', []]
        })
    }

    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit(): void {
        // NOTHING
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

    edit() {
        this.isEditing = !this.isEditing
        if (this.isEditing) {
            this.buildForm()
        }
    }

    buildForm() {
        this.formActive.reset()
        if (this.selectedActive != undefined) {
            this.formActive = this.formBuilder.group({
                name: [this.selectedActive.name, []],
                description: [this.selectedActive.description, []],
                type: [this.selectedActive.type, []],
                company: [this.selectedActive.company, []],
                product: [this.selectedActive.product, []],
                version: [this.selectedActive.version, []],
                cpeType: [this.selectedActive.cpeType, []],
                cpe: [this.selectedActive.cpe, []],
                importance: [this.selectedActive.importance, []],
                startAdquisition: [this.getFormatedDateTimeLikeInput(this.selectedActive.startAdquisition), []],
                endAdquisition: [this.getFormatedDateTimeLikeInput(this.selectedActive.endAdquisition), []],
                endOfLife: [this.getFormatedDateTimeLikeInput(this.selectedActive.endOfLife), []],
                cost: [this.selectedActive.cost, []],
                periodicity: [this.selectedActive.periodicity, []],
                subscriptionType: [this.selectedActive.subscriptionType, []],
                location: [this.selectedActive.location, []],
                children: this.formBuilder.array([]),
                activeUsers: this.formBuilder.array([])
            })

            // add childrens
            if (this.selectedActive.children != undefined) {
                this.selectedActive.children.forEach(a => this.addChildrenForm(a))
            }

            // add users
            if (this.selectedActive.activeUsers != undefined) {
                this.selectedActive.activeUsers.forEach(a => this.addActiveUserForm(a))
            }
        }
    }

    clearForms() {
        this.formActive.reset()
        this.formAddChild.reset()
        this.formAddUserAssignation.reset()
    }

    /***************************
        METHODS -> HANDLERS
    ***************************/

    handleNext(n: any) {
        this.selectedActive = n
        this.clearForms()
        this.reload.emit(true)
        this.containError = false
        this.edit()
    }

    handleError(e: any) {
        let r = e.error.text
        if (r == undefined) {
            r = 'Error produced'
        }
        this.messageError = r;
        this.containError = true
    }


    /***************************
        METHODS -> UPLOAD
    ***************************/

    uploadTask() {

        // CREATE
        if (this.selectedActive == undefined) {
            this.newActive()

            // UPDATE
        } else {
            this.editActive()
        }
    }

    childrensToSave(): Array<number> {
        return this.childrens.controls.map(x => x.value.id)
    }

    activeUsersToSave(): Array<ActiveUsersCreateDto> {
        if(this.activeUsers){
            return this.activeUsers.controls.map(x => new ActiveUsersCreateDto(
                x.value.status, x.value.serial, x.value.notes, x.value.ips, x.value.username
            ))
        } else {
            return []
        }
        
    }

    newActive() {
        if (this.projectId) {

            // create object
            let createActive: ActiveCreateDto = new ActiveCreateDto(this.formActive.value.name, this.formActive.value.description, this.formActive.value.type, this.formActive.value.company, this.formActive.value.product, this.formActive.value.version, this.formActive.value.cpeType, this.formActive.value.cpe, this.formActive.value.importance, new Date(this.formActive.value.startAdquisition), new Date(this.formActive.value.endAdquisition), new Date(this.formActive.value.endOfLife), this.formActive.value.cost, this.formActive.value.periodicity, this.formActive.value.subscriptionType, this.formActive.value.location, this.childrensToSave(), this.activeUsersToSave(), this.projectId)

            // rest
            this.activeService.createActive(createActive).subscribe({
                next: (n) => {
                    this.handleNext(n)
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }

    editActive() {
        if (this.projectId && this.selectedActive) {

            // create object
            let updateActive: ActiveUpdateDto = new ActiveUpdateDto(this.selectedActive.id, this.formActive.value.name, this.formActive.value.description, this.formActive.value.type, this.formActive.value.company, this.formActive.value.product, this.formActive.value.version, this.formActive.value.cpeType, this.formActive.value.cpe, this.formActive.value.importance, new Date(this.formActive.value.startAdquisition), new Date(this.formActive.value.endAdquisition), new Date(this.formActive.value.endOfLife), this.formActive.value.cost, this.formActive.value.periodicity, this.formActive.value.subscriptionType, this.formActive.value.location, this.childrensToSave(), this.activeUsersToSave())

            // rest
            this.activeService.updateActive(updateActive).subscribe({
                next: (n) => {
                    this.handleNext(n)
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }

    disableActive() {
        if(this.selectedActive) {
            this.activeService.disableActive(this.selectedActive.id).subscribe({
                next: (n) => {
                    this.handleNext(undefined)
                    this.closeModalActive.nativeElement.click()
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }


    /***************************
        METHODS -> AUXILIAR
    ***************************/


    // TIME
    getFormatedDateTimeLikeInput(date: Date) {
        return this.getFormatedDate(date, 'yyyy-MM-ddTHH:mm:ss')
    }
    getFormatedDate(date: Date, format: string) {
        let datePipe = new DatePipe('en-US');
        return datePipe.transform(date, format);
    }

    // PROFILE IMAGE
    public getProfileImageUrlFromUser(user: ShowUser): any {
        return this.userService.getUrlFromProfile(user.imageUid)
    }


    // CHILDRENS

    searchChildrenByName(childName: any) {
        if (this.projectId) {
            this.activeService.findActivesByProject(this.projectId, 0, 5, [],
                { name: { filterType: 'text', type: 'contains', filter: childName.value } },
                [{ field: "name" }]).subscribe(
                    data => {
                        this.searchChildren = data.content
                    })
        }
    }
    get childrens(): FormArray {
        return this.formActive.get("children") as FormArray
    }
    addChildrenFormInput() {
        if (this.projectId) {
            let s: string = this.formAddChild.value.children
            let c = s.split("#")[1].split(")")[0]
            this.activeService.findActivesByProject(this.projectId, 0, 1, [],
                { code: { filterType: 'text', type: 'contains', filter: c } },
                [{ field: "code" }]).subscribe(
                    data => {
                        this.addChildrenForm(data.content[0])
                    })
        }
    }

    addChildrenForm(c: ActiveShowChildrenDto | undefined) {
        if (c) {
            let fg = this.formBuilder.group({
                id: [c.id, []],
                code: [c.code, []],
                name: [c.name, []],
            })
            this.childrens.push(fg)
        }
    }

    removeChildrenForm(i: number) {
        this.childrens.removeAt(i)
    }



    // ACTIVE USERS

    get activeUsers(): FormArray {
        return this.formActive.get("activeUsers") as FormArray
    }

    addActiveUserFormInput() {
        let user = this.usersInProject.filter(x => x.username == this.formAddUserAssignation.value.username)[0]
        let a: ActiveUsersShowDto = new ActiveUsersShowDto(0, this.formAddUserAssignation.value.status, this.formAddUserAssignation.value.serial, this.formAddUserAssignation.value.notes, this.formAddUserAssignation.value.ips, user)
        this.addActiveUserForm(a)
        this.formAddUserAssignation.reset()
    }

    addActiveUserForm(a: ActiveUsersShowDto) {
        let fg = this.formBuilder.group({
            username: [a.user ? a.user.username : '', []],
            imageUid: [a.user ? a.user.imageUid : '', []],
            status: [a.status, []],
            serial: [a.serial, []],
            notes: [a.notes, []],
            ips: [a.ips, []]
        })
        this.activeUsers.push(fg)
    }

    removeActiveUserForm(i: number) {
        this.activeUsers.removeAt(i)
    }

}