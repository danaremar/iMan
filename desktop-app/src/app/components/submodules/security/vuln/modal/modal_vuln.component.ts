import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActiveListDto } from "src/app/models/actives/actives";
import { VulnCreateDto, VulnShowDto, VulnUpdateDto } from "src/app/models/vulns/vuln";
import { VulnLibListDto, VulnLibShowDto } from "src/app/models/vulns/vulnlib";
import { ActiveService } from "src/app/services/actives/actives.service";
import { VulnService } from "src/app/services/vulns/vuln.service";
import { VulnLibService } from "src/app/services/vulns/vulnlib.service";

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
    formAddActive: FormGroup
    formAddVulnLib: FormGroup

    // search actives & vulnlib
    searchActives: Array<ActiveListDto> = []
    searchVulnlibs: Array<VulnLibListDto> = []

    // close modal button
    @ViewChild('closeButtonVulnLib') closeButtonTask: any

    constructor(public formBuilder: FormBuilder, public vulnService: VulnService, public activeService: ActiveService, public vulnLibService: VulnLibService) {
        this.formVuln = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', []],
            creationDate: ['', []],
            affectedVersion: ['', []],
            newVersion: ['', []],
            affects: [false, []],
            notified: [false, []],
            fixed: [false, []],
            patchType: ['', []],
            patchDate: ['', []],
            relActiveId: ['', []],
            vulnlibs: this.formBuilder.array([])
        })

        this.formAddActive = this.formBuilder.group({
            id: ['', []],
            code: ['', []],
            name: ['', []]
        })

        this.formAddVulnLib = this.formBuilder.group({
            id: ['', []],
            name: ['', []]
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
        this.clearForms()
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
                patchDate: [this.getFormatedDateTimeLikeInput(this.selectedVuln.patchDate), []],
                relActiveId: [this.selectedVuln.relActive?this.selectedVuln.relActive.id:'', []],
                vulnlibs: this.formBuilder.array([])
            })

            // add active
            if (this.selectedVuln.relActive) {
                this.formAddActive = this.formBuilder.group({
                    id: ['', []],
                    code: [this.selectedVuln.relActive.code, []],
                    name: [this.selectedVuln.relActive.name, []],
                })
            }

            // add vulnlibs
            if (this.selectedVuln.vulnlib) {
                this.selectedVuln.vulnlib.forEach(a => this.addVulnLibForm(a))
            }

        }
    }

    clearForms() {
        this.formVuln.reset()
        this.formAddActive.reset()
        this.formAddVulnLib.reset()
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

    uploadVuln() {

        // CREATE
        if (this.selectedVuln == undefined) {
            this.newVuln()

            // UPDATE
        } else {
            this.editVuln()
        }
    }

    vulnlibsToSave(): Array<number> {
        if(this.vulnlibs){
            return this.vulnlibs.controls.map(x => x.value.id)
        } else {
            return []
        }
        
    }

    newVuln() {
        if (this.projectId) {
            // create object
            let createVuln: VulnCreateDto = new VulnCreateDto(this.formVuln.value.name, this.formVuln.value.description, this.formVuln.value.creationDate, this.formVuln.value.affectedVersion, this.formVuln.value.newVersion, this.formVuln.value.affects, this.formVuln.value.notified, this.formVuln.value.fixed, this.formVuln.value.patchType, this.formVuln.value.patchDate, this.formVuln.value.relActiveId, this.vulnlibsToSave())

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
        if (this.projectId && this.selectedVuln) {
            // create object
            let updateVuln: VulnUpdateDto = new VulnUpdateDto(this.selectedVuln.id, this.formVuln.value.name, this.formVuln.value.description, this.formVuln.value.creationDate, this.formVuln.value.affectedVersion, this.formVuln.value.newVersion, this.formVuln.value.affects, this.formVuln.value.notified, this.formVuln.value.fixed, this.formVuln.value.patchType, this.formVuln.value.patchDate, this.formVuln.value.relActiveId, this.vulnlibsToSave())

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
    getFormatedDateTimeLikeInput(date: Date) {
        return this.getFormatedDate(date, 'yyyy-MM-ddTHH:mm:ss')
    }
    getFormatedDate(date: Date, format: string) {
        let datePipe = new DatePipe('en-US');
        return datePipe.transform(date, format);
    }

    // VULNLIBs
    get vulnlibs(): FormArray {
        return this.formVuln.get("vulnlibs") as FormArray
        
    }
    addVulnLibForm(c: VulnLibShowDto | undefined) {
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
    removeVulnLibForm(i: number) {
        this.vulnlibs.removeAt(i)
    }
    searchVulnLibByName(vulnLibName: any) {
        if (this.projectId) {
            this.vulnLibService.findVulnLibsByProject(this.projectId, 0, 5, [],
                { name: { filterType: 'text', type: 'contains', filter: vulnLibName.value } },
                [{ field: "name" }]).subscribe(
                    data => {
                        this.searchVulnlibs = data.content
                    })
        }
    }
    addVulnLibFormInput() {
        if (this.searchVulnlibs) {
            let vl = this.searchVulnlibs.filter(x => x.name == this.formAddVulnLib.value.name)[0]
            if (vl) { this.addVulnLibForm(vl as VulnLibShowDto) }
        }
    }

    // ACTIVE
    searchActiveByName(activeName: any) {
        if (this.projectId) {
            this.activeService.findActivesByProject(this.projectId, 0, 5, [],
                { name: { filterType: 'text', type: 'contains', filter: activeName.value } },
                [{ field: "name" }]).subscribe(
                    data => {
                        this.searchActives = data.content
                    })
        }
    }
    searchActiveByCode(activeCode: any) {
        if (this.projectId) {
            this.activeService.findActivesByProject(this.projectId, 0, 5, [],
                { code: { filterType: 'text', type: 'contains', filter: activeCode.value } },
                [{ field: "code" }]).subscribe(
                    data => {
                        this.searchActives = data.content
                    })
        }
    }
    addActiveFormInput() {
        // declare active
        let a: ActiveListDto | undefined = undefined

        // filter if posible
        let c = this.searchActives.filter(x => x.code == this.formAddActive.value.code)[0]
        let n = this.searchActives.filter(x => x.name == this.formAddActive.value.name)[0]

        // check, set active & set other value
        if (this.searchActives && c != undefined) {
            a = c
            this.formAddActive.controls['name'].setValue(a.name)
        } else if (this.searchActives && n != undefined) {
            a = n
            this.formAddActive.controls['code'].setValue(a.code)
        }

        // set id
        if (a != undefined) {
            // set id to form
            this.formVuln.controls['relActiveId'].setValue(a ? a.id : undefined)
        }
    }

}
