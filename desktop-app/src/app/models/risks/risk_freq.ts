
export class RiskFreqCreateDto {

    constructor(name: string, quantity: number) {
        this.name = name
        this.quantity = quantity
    }

    name: string
    quantity: number
}

export class RiskFreqUpdateDto extends RiskFreqCreateDto {

    constructor(id: number, name: string, quantity: number) {
        super(name, quantity)
        this.id = id
    }

    id: number
}

export class RiskFreqShowDto {

    constructor(id: number, name: string, quantity: number) {
        this.id = id
        this.name = name
        this.quantity = quantity
    }

    id: number
    name: string
    quantity: number
}