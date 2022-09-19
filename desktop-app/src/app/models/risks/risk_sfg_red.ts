import { RiskDimShowDto } from "./risk_dim"

export class RiskSfgRedShowDto {

    constructor(
        id: number,
        reduction: number,
        cost: number,
        riskDimension: RiskDimShowDto
    ) {
        this.id = id
        this.reduction = reduction
        this.cost = cost
        this.riskDimension = riskDimension
    }

    id: number
    reduction: number
    cost: number
    riskDimension: RiskDimShowDto
}

export class RiskSfgRedUpdateDto {

    constructor(
        id: number,
        reduction: number,
        cost: number,
        riskDimensionId: number
    ) {
        this.id = id
        this.reduction = reduction
        this.cost = cost
        this.riskDimensionId = riskDimensionId
    }

    id: number
    reduction: number
    cost: number
    riskDimensionId: number
}