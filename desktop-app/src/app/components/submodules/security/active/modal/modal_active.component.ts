import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActiveListDto, ActiveShowChildrenDto, ActiveShowDto } from "src/app/models/actives/actives";
import { ActiveUsersShowDto } from "src/app/models/actives/user-actives";
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

    // error messages
    containError: boolean = false
    messageError: string | undefined

    // form
    formActive: FormGroup

    // close modal button
    @ViewChild('closeButtonActive') closeButtonTask: any

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
            activeUsers: this.formBuilder.array([])
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
        if (this.isEditing) {
            this.buildForm()
        }
    }

    buildForm() {
        this.formActive.reset()
        if (this.selectedActive != undefined) {
            this.formActive = this.formBuilder.group({
                name: [this.selectedActive.name, [Validators.required]],
                description: [this.selectedActive.description, []],
                type: [this.selectedActive.type, []],
                company: [this.selectedActive.company, []],
                product: [this.selectedActive.product, []],
                version: [this.selectedActive.version, []],
                cpeType: [this.selectedActive.cpeType, []],
                cpe: [this.selectedActive.cpe, []],
                importance: [this.selectedActive.importance, []],
                startAdquisition: [this.selectedActive.startAdquisition, []],
                endAdquisition: [this.selectedActive.endAdquisition, []],
                endOfLife: [this.selectedActive.endOfLife, []],
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


    newActive() {
        // get childrens


        // get activeUsers


        // rest
    }

    editActive() {
        // get childrens


        // get activeUsers


        // rest
    }


    /***************************
        METHODS -> AUXILIAR
    ***************************/


    // CHILDRENS

    get childrens(): FormArray {
        return this.formActive.get("children") as FormArray
    }

    addChildrenForm(a: ActiveShowChildrenDto) {
        let fg = this.formBuilder.group({
            id: [a.id, []],
            code: [a.code, []],
            name: [a.name, []],
        })
        this.childrens.push(fg)
    }

    removeChildrenForm(i: number) {
        this.childrens.removeAt(i)
    }



    // ACTIVE USERS

    get activeUsers(): FormArray {
        return this.formActive.get("activeUsers") as FormArray
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
        this.childrens.push(fg)
    }

    removeActiveUserForm(i: number) {
        this.activeUsers.removeAt(i)
    }

}