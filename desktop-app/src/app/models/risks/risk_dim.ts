export class RiskDimCreateDto {

    constructor(abbreviation: string, name: string) {
        this.abbreviation = abbreviation
        this.name = name
    }

    abbreviation: string
    name: string
}

export class RiskDimUpdateDto extends RiskDimCreateDto {

    constructor(id: number, abbreviation: string, name: string) {
        super(abbreviation, name)
        this.id = id
    }

    id: number
}

export class RiskDimShowDto {

    constructor(id: number, abbreviation: string, name: string) {
        this.id = id
        this.abbreviation = abbreviation
        this.name = name
    }

    id: number
    abbreviation: string
    name: string
}