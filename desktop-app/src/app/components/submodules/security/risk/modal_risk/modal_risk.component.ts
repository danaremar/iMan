import { DatePipe } from "@angular/common";
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActiveListDto } from "src/app/models/actives/actives";
import { RiskCreateDto, RiskShowDto, RiskUpdateDto } from "src/app/models/risks/risk";
import { RiskCalcShowDto, RiskCalcUpdateDto } from "src/app/models/risks/risk_calc";
import { RiskDimShowDto } from "src/app/models/risks/risk_dim";
import { RiskFreqShowDto } from "src/app/models/risks/risk_freq";
import { RiskSfgShowDto, RiskSfgUpdateDto } from "src/app/models/risks/risk_sfg";
import { RiskSfgRedShowDto, RiskSfgRedUpdateDto } from "src/app/models/risks/risk_sfg_red";
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
export class ModalRisk implements OnChanges {

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

    // get configuration
    riskFreqLs: Array<RiskFreqShowDto> = []
    riskDimLs: Array<RiskDimShowDto> = []

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
            riskType: ['', []],
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

    ngOnChanges(): void {
        // get risk config
        this.getRiskFreq()
        this.getRiskDim()

        // build form
        this.buildForm()
    }

    getRiskFreq() {
        if (this.projectId) {
            this.riskFreqService.getRiskFreqByProjectId(this.projectId).subscribe({
                next: (n) => {
                    this.riskFreqLs = n
                    this.containError = false
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
                    this.riskDimLs = n
                    this.containError = false
                },
                error: (e) => {
                    this.handleError(e)
                }
            })
        }
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

            // build forms
            this.formRisk = this.formBuilder.group({
                name: [this.selectedRisk.name, []],
                description: [this.selectedRisk.description, []],
                riskType: [this.selectedRisk.riskType, []],
                riskCalc: this.formBuilder.array([]),
                riskSfg: this.formBuilder.array([])
            })
            if (this.selectedRisk.assignedActive) {
                this.formAddActive = this.formBuilder.group({
                    id: [this.selectedRisk.assignedActive.id, []],
                    code: [this.selectedRisk.assignedActive.code, []],
                    name: [this.selectedRisk.assignedActive.name, []]
                })
            }
            if (this.selectedRisk.assignedVuln) {
                this.formAddVuln = this.formBuilder.group({
                    id: [this.selectedRisk.assignedVuln.id, []],
                    code: [this.selectedRisk.assignedVuln.code, []],
                    name: [this.selectedRisk.assignedVuln.name, []]
                })
            }

            // add riskCalc
            if (this.selectedRisk.riskCalc) {
                this.selectedRisk.riskCalc.forEach(a => this.addRiskCalcForm(a))
            } else if (this.riskDimLs) {
                this.riskDimLs.forEach(a => this.addRiskCalcEmpty(a))
            }

            // add riskSfg
            if (this.selectedRisk.riskSfg) {
                this.selectedRisk.riskSfg.forEach(a => this.addRiskSfgForm(a))
            } else if (this.riskDimLs) {
                this.addRiskSfgEmpty()
            }
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

    getRiskCalcUpdateLs(): Array<RiskCalcUpdateDto> {
        return this.riskCalcs.controls.map(a => new RiskCalcUpdateDto(a.value.id, a.value.value, a.value.degradation, a.value.freq, a.value.dim))
    }

    getRiskSfgUpdateLs(): Array<RiskSfgUpdateDto> {
        return this.riskSfg.controls.map(a => new RiskSfgUpdateDto(a.value.id, a.value.name, a.value.description, a.value.active,
            a.value.riskSfgReduction.map((b: { id: number; reduction: number; cost: number; dim: number; }) =>
                new RiskSfgRedUpdateDto(b.id, b.reduction, b.cost, b.dim))))
    }

    editRisk() {
        if (this.projectId && this.selectedRisk) {
            // create object
            let updateRisk: RiskUpdateDto = new RiskUpdateDto(this.selectedRisk.id, this.formRisk.value.name, this.formRisk.value.description, this.formAddActive.value.id, this.formAddVuln.value.id, this.formRisk.value.riskType, this.getRiskCalcUpdateLs(), this.getRiskSfgUpdateLs())

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
            this.formAddActive.controls['id'].setValue(a ? a.id : undefined)
        }
    }

    // VULN
    searchVulnByName(vulnName: any) {
        if (this.projectId) {
            this.vulnService.findVulnsByProject(this.projectId, 0, 5, [],
                { name: { filterType: 'text', type: 'contains', filter: vulnName.value } },
                [{ field: "name" }]).subscribe(
                    data => {
                        this.searchActives = data.content
                    })
        }
    }
    searchVulnByCode(vulnCode: any) {
        if (this.projectId) {
            this.vulnService.findVulnsByProject(this.projectId, 0, 5, [],
                { code: { filterType: 'text', type: 'contains', filter: vulnCode.value } },
                [{ field: "code" }]).subscribe(
                    data => {
                        this.searchActives = data.content
                    })
        }
    }
    addVulnFormInput() {
        // declare vuln
        let a: VulnListDto | undefined = undefined

        // filter if posible
        let c = this.searchVulns.filter(x => x.code == this.formAddVuln.value.code)[0]
        let n = this.searchVulns.filter(x => x.name == this.formAddVuln.value.name)[0]

        // check, set active & set other value
        if (this.searchVulns && c != undefined) {
            a = c
            this.formAddVuln.controls['name'].setValue(a.name)
        } else if (this.searchVulns && n != undefined) {
            a = n
            this.formAddVuln.controls['code'].setValue(a.code)
        }

        // set id
        if (a != undefined) {
            // set id to form
            this.formAddVuln.controls['id'].setValue(a ? a.id : undefined)
        }
    }

    // RISK CALC
    get riskCalcs(): FormArray {
        return this.formRisk.get("riskCalc") as FormArray
    }
    addRiskCalcForm(c: RiskCalcShowDto | undefined) {
        if (c) {
            let fg = this.formBuilder.group({
                id: [c.id, []],
                dim: [c.riskDimension.id, []],
                value: [c.value, []],
                degradation: [c.degradation, []],
                freq: [c.riskFreq.id, []],
                totalWoSfg: [c.totalWoSfg, []],
                sfgRed: ['', []],
                sfgCost: ['', []],
                total: [c.total, []]
            })
            this.riskCalcs.push(fg)
        }
    }
    removeRiskCalcForm(i: number) {
        this.riskCalcs.removeAt(i)
    }
    addRiskCalcEmpty(riskDimShowDto: RiskDimShowDto) {
        let riskCalc: RiskCalcShowDto = new RiskCalcShowDto(0, 0, 0, 0, 0, this.riskFreqLs[0], riskDimShowDto)
        this.addRiskCalcForm(riskCalc)
    }


    // RISK SFG
    get riskSfg(): FormArray {
        return this.formRisk.get("riskSfg") as FormArray
    }
    addRiskSfgForm(c: RiskSfgShowDto | undefined) {
        if (c) {
            let fg = this.formBuilder.group({
                id: [c.id, []],
                name: [c.name, []],
                description: [c.description, []],
                active: [c.active, []],
                riskSfgReduction: this.formBuilder.array(
                    c.riskSfgReduction.map(
                        r => this.formBuilder.group({
                            id: [r.id, []],
                            reduction: [r.reduction, []],
                            cost: [r.cost, []],
                            dim: [r.riskDimension.id, []],
                        })
                    )
                )
            })
            this.riskSfg.push(fg)
        }
    }
    removeRiskSfgForm(i: number) {
        this.riskSfg.removeAt(i)
    }
    addRiskSfgEmpty() {
        let riskSfgRed: Array<RiskSfgRedShowDto> = []
        this.riskDimLs.forEach(a => riskSfgRed.push(new RiskSfgRedShowDto(0, 0, 0, a)))
        let riskSfg: RiskSfgShowDto = new RiskSfgShowDto(0, '', '', true, riskSfgRed)
        this.addRiskSfgForm(riskSfg)
    }

    // RISK SFG RED
    riskSfgRedForm(sfgNum: number): FormArray {
        return this.riskSfg.at(sfgNum).get('riskSfgReduction') as FormArray
    }

    getDimension(id: number) {
        let selectedDim: RiskDimShowDto = this.riskDimLs.filter(a => a.id == id)[0]
        return selectedDim.name + ' (' + selectedDim.abbreviation + ')'
    }


}