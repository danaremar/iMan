import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core"
import { FormArray, FormBuilder, FormGroup } from "@angular/forms"
import { RiskShowDto } from "src/app/models/risks/risk"
import { RiskDimShowDto, RiskDimUpdateDto } from "src/app/models/risks/risk_dim"
import { RiskFreqShowDto, RiskFreqUpdateDto } from "src/app/models/risks/risk_freq"
import { RiskDimService } from "src/app/services/risks/risk_dim.service"
import { RiskFreqService } from "src/app/services/risks/risk_freq.service"

@Component({
    selector: 'risk-config-modal-view',
    templateUrl: './modal_risk_config.component.html',
    styleUrls: ['./modal_risk_config.component.css']
})
export class ModalRiskConfig implements OnInit {

    // emit one event to reload
    @Output()
    reload = new EventEmitter<boolean>()

    // error messages
    containError: boolean = false
    messageError: string | undefined

    // selected configs
    riskFreqLs: Array<RiskFreqShowDto> | undefined
    riskDimLs: Array<RiskDimShowDto> | undefined

    // selected project id
    @Input()
    projectId: number | undefined | null

    // form
    formRiskConfig: FormGroup

    // close modal button
    @ViewChild('closeButtonRiskConfig') closeButtonRiskConfig: any

    constructor(public formBuilder: FormBuilder, public riskFreqService: RiskFreqService, public riskDimService: RiskDimService) {
        this.formRiskConfig = this.formBuilder.group({
            riskDim: this.formBuilder.array([]),
            riskFreq: this.formBuilder.array([])
        })
    }

    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit(): void {
        this.buildForm()
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

    buildForm() {
        this.formRiskConfig.reset()

        // get risk freq & dim
        this.getRiskFreq()
        this.getRiskDim()

        // create form risk freq
        if (this.riskFreqLs) {
            this.riskFreqLs.forEach(a => this.addRiskFreqForm(a))
        }

        // create form risk dim
        if (this.riskDimLs) {
            this.riskDimLs.forEach(a => this.addRiskDimForm(a))
        }

    }

    getRiskFreq() {
        if (this.projectId) {
            this.riskFreqService.getRiskFreqByProjectId(this.projectId).subscribe({
                next: (n) => {
                    this.riskFreqLs = n.content
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }

    getRiskDim() {
        if (this.projectId) {
            this.riskDimService.getRiskDimByProjectId(this.projectId).subscribe({
                next: (n) => {
                    this.riskDimLs = n.content
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }

    /***************************
        METHODS -> UPLOAD
    ***************************/

    uploadRiskConfig() {
        this.uploadRiskDim()
        this.uploadRiskFreq()
    }

    uploadRiskFreq() {
        if (this.projectId) {
            let riskUpdateFreqLs: Array<RiskFreqUpdateDto> = this.riskFreqForm.controls.map(x => new RiskFreqUpdateDto(x.value.id, x.value.name, x.value.quantity))
            this.riskFreqService.updateAllRiskFreq(this.projectId, riskUpdateFreqLs).subscribe({
                next: (n) => {
                    this.handleNext(n)
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
    }

    uploadRiskDim() {
        if (this.projectId) {
            let riskUpdateDimLs: Array<RiskDimUpdateDto> = this.riskDimForm.controls.map(x => new RiskDimUpdateDto(x.value.id, x.value.abbreviation, x.value.name))
            this.riskDimService.updateAllRiskDim(this.projectId, riskUpdateDimLs).subscribe({
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

    handleNext(n: any) {
        this.reload.emit(true)
        this.containError = false
        this.buildForm()
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
        METHODS -> AUXILIAR
    ***************************/

    // RISK FREQUENCY
    get riskFreqForm(): FormArray {
        return this.formRiskConfig.get('riskFreq') as FormArray
    }
    addRiskFreqForm(c: RiskFreqShowDto | undefined) {
        if (c) {
            let fg = this.formBuilder.group({
                id: [c.id, []],
                name: [c.name, []],
                quantity: [c.quantity, []]
            })
            this.riskFreqForm.push(fg)
        }
    }
    removeRiskFreqForm(i: number) {
        this.riskFreqForm.removeAt(i)
    }


    // RISK DIMENSION
    get riskDimForm(): FormArray {
        return this.formRiskConfig.get('riskDim') as FormArray
    }
    addRiskDimForm(c: RiskDimShowDto | undefined) {
        if (c) {
            let fg = this.formBuilder.group({
                id: [c.id, []],
                name: [c.name, []],
                abbreviation: [c.abbreviation, []]
            })
            this.riskDimForm.push(fg)
        } else {
            let fg = this.formBuilder.group({
                id: [null, []],
                name: ['', []],
                abbreviation: ['', []]
            })
            this.riskDimForm.push(fg)
        }
    }
    removeRiskDimForm(i: number) {
        this.riskDimForm.removeAt(i)
    }

}