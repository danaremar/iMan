import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VulnLibCreateDto, VulnLibShowDto } from "src/app/models/vulns/vulnlib";
import { VulnLibService } from "src/app/services/vulns/vulnlib.service";

@Component({
    selector: 'vulnlib-modal-view',
    templateUrl: './modal_vulnlib.component.html',
    styleUrls: ['./modal_vulnlib.component.css']
})
export class ModalVulnLib implements OnInit {

    // user can edit?
    @Input()
    isEditable: boolean = false

    // is editing right now?
    @Input()
    isEditing: boolean = false

    // emit one event to reload
    @Output()
    reload = new EventEmitter<boolean>()

    // error messages
    containError: boolean = false
    messageError: string | undefined

    // selected vulnlib
    @Input()
    selectedVulnLib: VulnLibShowDto | undefined

    // selected project id
    @Input()
    projectId: number | undefined | null

    // form
    formVulnLib: FormGroup

    // close modal button
    @ViewChild('closeButtonVulnLib') closeButtonTask: any

    constructor(public formBuilder: FormBuilder, public vulnLibService: VulnLibService) {
        this.formVulnLib = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', []],
            company: ['', []],
            product: ['', []],
            affectedVersions: ['', []],
            standard: ['', []],
            cweType: ['', []],
            cvss: ['', []],
            cvssVector: ['', []],
            lang: ['', []],
            vulnlinks: ['', []]
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
        this.formVulnLib.reset()
        if (this.selectedVulnLib != undefined) {
            this.formVulnLib = this.formBuilder.group({
                name: [this.selectedVulnLib.name, [Validators.required]],
                description: [this.selectedVulnLib.description, []],
                company: [this.selectedVulnLib.company, []],
                product: [this.selectedVulnLib.product, []],
                affectedVersions: [this.selectedVulnLib.affectedVersions, []],
                standard: [this.selectedVulnLib.standard, []],
                cweType: [this.selectedVulnLib.cweType, []],
                cvss: [this.selectedVulnLib.cvss, []],
                cvssVector: [this.selectedVulnLib.cvssVector, []],
                lang: [this.selectedVulnLib.lang, []],
                vulnlinks: [this.selectedVulnLib.vulnlinks, []]
            })
        }
    }

    clearForms() {
        this.formVulnLib.reset()
    }

    /***************************
        METHODS -> HANDLERS
    ***************************/

    handleNext(n: any) {
        this.selectedVulnLib = n
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
        if (this.selectedVulnLib == undefined) {
            this.newVulnLib()

            // UPDATE
        } else {
            this.editVulnLib()
        }
    }

    newVulnLib() {
        if(this.projectId) {
            // create object
            let createVulnLib: VulnLibCreateDto = new VulnLibCreateDto(this.formVulnLib.value.name,this.formVulnLib.value.description,this.formVulnLib.value.company,this.formVulnLib.value.product,this.formVulnLib.value.affectedVersions,this.formVulnLib.value.standard,this.formVulnLib.value.cweType,this.formVulnLib.value.cvss,this.formVulnLib.value.cvssVector,this.formVulnLib.value.lang,[])
        }
    }

    editVulnLib() {

    }


    /***************************
        METHODS -> AUXILIAR
    ***************************/


    // TIME
    getFormatedDate(date: Date, format: string) {
        let datePipe = new DatePipe('en-US');
        return datePipe.transform(date, format);
    }
}