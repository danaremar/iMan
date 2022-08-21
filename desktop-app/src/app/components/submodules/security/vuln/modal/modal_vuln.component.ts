import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { VulnCreateDto, VulnShowDto, VulnUpdateDto } from "src/app/models/vulns/vuln";
import { VulnLibShowDto } from "src/app/models/vulns/vulnlib";
import { VulnService } from "src/app/services/vulns/vuln.service";

@Component({
    selector: 'vuln-modal-view',
    templateUrl: './modal_vuln.component.html',
    styleUrls: ['./modal_vuln.component.css']
})
export class ModalVuln implements OnInit {

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
    selectedVuln: VulnShowDto | undefined

    // selected project id
    @Input()
    projectId: number | undefined | null

    // form
    formVuln: FormGroup

    // close modal button
    @ViewChild('closeButtonVulnLib') closeButtonTask: any

    constructor(public formBuilder: FormBuilder, public vulnService: VulnService) {
        this.formVuln = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', []],
            creationDate: ['', []],
            affectedVersion: ['', []],
            newVersion: ['', []],
            affects: ['', []],
            notified: ['', []],
            fixed: ['', []],
            patchType: ['', []],
            patchDate: ['', []],
            relActiveId: ['', []],
            vulnlibIdLs: this.formBuilder.array([])
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
        this.formVuln.reset()
        if (this.selectedVuln != undefined) {
            this.formVuln = this.formBuilder.group({
                name: [this.selectedVuln.name, [Validators.required]],
                description: [this.selectedVuln.description, []],
                creationDate: [this.selectedVuln.creationDate, []],
                affectedVersion: [this.selectedVuln.affectedVersion, []],
                newVersion: [this.selectedVuln.newVersion, []],
                affects: [this.selectedVuln.affects, []],
                notified: [this.selectedVuln.notified, []],
                fixed: [this.selectedVuln.fixed, []],
                patchType: [this.selectedVuln.patchType, []],
                patchDate: [this.selectedVuln.patchDate, []],
                relActiveId: [this.selectedVuln.relActive.id, []],
                vulnlibs: this.formBuilder.array([])
            })
        }
    }

    clearForms() {
        this.formVuln.reset()
    }


    /***************************
        METHODS -> HANDLERS
    ***************************/

    handleNext(n: any) {
        this.selectedVuln = n
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
        if (this.selectedVuln == undefined) {
            this.newVuln()

            // UPDATE
        } else {
            this.editVuln()
        }
    }

    newVuln() {
        if(this.projectId) {
            // create object
            let createVuln: VulnCreateDto = new VulnCreateDto(this.formVuln.value.name,this.formVuln.value.description,this.formVuln.value.creationDate,this.formVuln.value.affectedVersion,this.formVuln.value.newVersion,this.formVuln.value.affects,this.formVuln.value.notified,this.formVuln.value.fixed,this.formVuln.value.patchType,this.formVuln.value.patchDate,this.formVuln.value.relActiveId,[])
        
            // rest
            this.vulnService.createVuln(this.projectId, createVuln).subscribe({
                next: (n) => {
                    this.handleNext(n)
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }

    editVuln() {
        if(this.projectId && this.selectedVuln) {
            // create object
            let updateVuln: VulnUpdateDto = new VulnUpdateDto(this.selectedVuln.id, this.formVuln.value.name,this.formVuln.value.description,this.formVuln.value.creationDate,this.formVuln.value.affectedVersion,this.formVuln.value.newVersion,this.formVuln.value.affects,this.formVuln.value.notified,this.formVuln.value.fixed,this.formVuln.value.patchType,this.formVuln.value.patchDate,this.formVuln.value.relActiveId,[])
        
            // rest
            this.vulnService.updateVuln(updateVuln).subscribe({
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
        METHODS -> AUXILIAR
    ***************************/

    // TIME
    getFormatedDate(date: Date, format: string) {
        let datePipe = new DatePipe('en-US');
        return datePipe.transform(date, format);
    }

    // VULNLIBs
    get vulnlibs(): FormArray {
        return this.formVuln.get("vulnlibs") as FormArray
    }
    addVulnLibForm(c : VulnLibShowDto | undefined) {
        if (c) {
            let fg = this.formBuilder.group({
                id: [c.id, []],
                name: [c.name, []],
                description: [c.description, []],
                company: [c.company, []],
                product: [c.product, []],
                affectedVersions: [c.affectedVersions, []],
                standard: [c.standard, []],
                creationDate: [c.creationDate, []],
                modificationDate: [c.modificationDate, []],
                cweType: [c.cweType, []],
                cvss: [c.cvss, []],
                cvssVector: [c.cvssVector, []]
            })
            this.vulnlibs.push(fg)
        }
    }
    removeVulnForm(i: number) {
        this.vulnlibs.removeAt(i)
    }

}
