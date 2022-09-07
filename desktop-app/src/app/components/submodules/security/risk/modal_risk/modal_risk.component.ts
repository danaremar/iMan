import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActiveListDto } from "src/app/models/actives/actives";
import { RiskCreateDto, RiskShowDto, RiskUpdateDto } from "src/app/models/risks/risk";
import { VulnListDto } from "src/app/models/vulns/vuln";
import { ActiveService } from "src/app/services/actives/actives.service";
import { RiskService } from "src/app/services/risks/risk.service";
import { RiskDimService } from "src/app/services/risks/risk_dim.service";
import { RiskFreqService } from "src/app/services/risks/risk_freq.service";
import { VulnService } from "src/app/services/vulns/vuln.service";

@Component({
    selector: 'risk-modal-view',
    templateUrl: './modal_risk.component.html',
    styleUrls: ['./modal_risk.component.css']
})
export class ModalRisk implements OnInit {

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

    // selected risk
    @Input()
    selectedRisk: RiskShowDto | undefined

    // selected project id
    @Input()
    projectId: number | undefined | null

    // form
    formRisk: FormGroup
    formAddActive: FormGroup
    formAddVuln: FormGroup

    // search actives & vulns
    searchActives: Array<ActiveListDto> = []
    searchVulns: Array<VulnListDto> = []

    // close modal button
    @ViewChild('closeButtonRisk') closeButtonTask: any

    constructor(public formBuilder: FormBuilder, public vulnService: VulnService, public activeService: ActiveService, public riskService: RiskService, public riskFreqService: RiskFreqService, public riskDimService: RiskDimService) {
        this.formRisk = this.formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', []],
            riskCalc: this.formBuilder.array([]),
            riskSfg: this.formBuilder.array([])
        })
        this.formAddActive = this.formBuilder.group({
            id: ['', []],
            code: ['', []],
            name: ['', []]
        })
        this.formAddVuln = this.formBuilder.group({
            id: ['', []],
            code: ['', []],
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

    clearForms() {
        this.formRisk.reset()
        this.formAddActive.reset()
        this.formAddVuln.reset()
    }

    buildForm() {
        this.clearForms()
        if (this.selectedRisk != undefined) {

        }
    }

    /***************************
        METHODS -> HANDLERS
    ***************************/

    handleNext(n: any) {
        this.selectedRisk = n
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

    uploadRisk() {

        // CREATE
        if (this.selectedRisk == undefined) {
            this.newRisk()

            // UPDATE
        } else {
            this.editRisk()
        }
    }

    newRisk() {
        if (this.projectId) {
            // create object
            let createRisk: RiskCreateDto = new RiskCreateDto(this.formRisk.value.name, this.formRisk.value.description, this.formAddActive.value.id, this.formAddVuln.value.id, this.formRisk.value.riskType, [], [])

            // rest
            this.riskService.createRisk(this.projectId, createRisk).subscribe({
                next: (n) => {
                    this.handleNext(n)
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }

    editRisk() {
        if (this.projectId && this.selectedRisk) {
            // create object
            let updateRisk: RiskUpdateDto = new RiskUpdateDto(this.selectedRisk.id, this.formRisk.value.name, this.formRisk.value.description, this.formAddActive.value.id, this.formAddVuln.value.id, this.formRisk.value.riskType, [], [])

            // rest
            this.riskService.updateRisk(updateRisk).subscribe({
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

    // NUMBERS
    transformNumberToString(n: number, integers: number, fraction: number): string {
        return n.toLocaleString('en-US', {
            minimumIntegerDigits: integers,
            maximumFractionDigits: fraction
        })
    }


}