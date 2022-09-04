import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from "@angular/core"
import { FormBuilder, FormGroup } from "@angular/forms"
import { RiskDimShowDto } from "src/app/models/risks/risk_dim"
import { RiskFreqShowDto } from "src/app/models/risks/risk_freq"
import { RiskDimService } from "src/app/services/risks/risk_dim.service"
import { RiskFreqService } from "src/app/services/risks/risk_freq.service"

@Component({
    selector: 'risk-config-modal-view',
    templateUrl: './modal_risk_config.component.html',
    styleUrls: ['./modal_risk_config.component.css']
})
export class ModalVuln implements OnInit {

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

    buildForm() {
        this.formRiskConfig.reset()
        this.getRiskFreq()
        this.getRiskDim()
    }

    getRiskFreq() {
        if(this.projectId) {
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
        if(this.projectId) {
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
        METHODS -> HANDLERS
    ***************************/

    handleError(e: any) {
        let r = e.error.text
        if (r == undefined) {
            r = 'Error produced'
        }
        this.messageError = r;
        this.containError = true
    }


}