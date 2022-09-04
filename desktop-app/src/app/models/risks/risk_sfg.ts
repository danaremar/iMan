import { RiskSfgRedUpdateDto } from "./risk_sfg_red"

export class RiskSfgShowDto {

    constructor(
        id: number,
        name: string,
        description: string,
        active: boolean,
        riskSfgReduction: Array<RiskSfgShowDto>
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.active = active
        this.riskSfgReduction = riskSfgReduction
    }

    id: number
    name: string
    description: string
    active: boolean
    riskSfgReduction: Array<RiskSfgShowDto>
}

export class RiskSfgUpdateDto {

    constructor(
        id: number,
        name: string,
        description: string,
        active: boolean,
        riskSfgReduction: Array<RiskSfgRedUpdateDto>
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.active = active
        this.riskSfgReduction = riskSfgReduction
    }

    id: number
    name: string
    description: string
    active: boolean
    riskSfgReduction: Array<RiskSfgRedUpdateDto>
}