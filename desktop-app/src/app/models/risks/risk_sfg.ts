import { RiskSfgRedShowDto, RiskSfgRedUpdateDto } from "./risk_sfg_red"

export class RiskSfgShowDto {

    constructor(
        id: number,
        name: string,
        description: string,
        active: boolean,
        riskSfgReduction: Array<RiskSfgRedShowDto>
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
    riskSfgReduction: Array<RiskSfgRedShowDto>
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