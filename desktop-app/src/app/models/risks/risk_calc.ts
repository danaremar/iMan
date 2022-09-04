import { RiskDimShowDto } from "./risk_dim"
import { RiskFreqShowDto } from "./risk_freq"

export class RiskCalcShowDto {

    constructor(
        id: number,
        value: number,
        degradation: number,
        totalWoSfg: number,
        total: number,
        riskFreq: RiskFreqShowDto,
        riskDim: RiskDimShowDto
    ) {
        this.id = id
        this.value = value
        this.degradation = degradation
        this.totalWoSfg = totalWoSfg
        this.total = total
        this.riskFreq = riskFreq
        this.riskDim = riskDim
    }

    id: number
    value: number
    degradation: number
    totalWoSfg: number
    total: number
    riskFreq: RiskFreqShowDto
    riskDim: RiskDimShowDto
}

export class RiskCalcUpdateDto {

    constructor(
        id: number,
        value: number,
        degradation: number,
        riskFreqId: number,
        riskDimensionId: number
    ) {
        this.id = id
        this.value = value
        this.degradation = degradation
        this.riskFreqId = riskFreqId
        this.riskDimensionId = riskDimensionId
    }

    id: number
    value: number
    degradation: number
    riskFreqId: number
    riskDimensionId: number
}