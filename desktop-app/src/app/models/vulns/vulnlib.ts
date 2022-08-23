export class VulnLibCreateDto {

    constructor(
        name: string,
        description: string,
        company: string,
        product: string,
        affectedVersions: string,
        cweType: string,
        cvss: number,
        cvssVector: string,
        lang: string,
        vulnlinks: Array<VulnLinkCreateDto>
    ) {
        this.name = name
        this.description = description
        this.company = company
        this.product = product
        this.affectedVersions = affectedVersions
        this.cweType = cweType
        this.cvss = cvss
        this.cvssVector = cvssVector
        this.lang = lang
        this.vulnlinks = vulnlinks
    }

    name: string
    description: string
    company: string
    product: string
    affectedVersions: string
    cweType: string
    cvss: number
    cvssVector: string
    lang: string
    vulnlinks: Array<VulnLinkCreateDto>
}

export class VulnLibUpdateDto extends VulnLibCreateDto {

    constructor(id: number,
        name: string,
        description: string,
        company: string,
        product: string,
        affectedVersions: string,
        cweType: string,
        cvss: number,
        cvssVector: string,
        lang: string,
        vulnlinks: Array<VulnLinkCreateDto>
    ) {
        super(name, description, company, product, affectedVersions, cweType, cvss, cvssVector, lang, vulnlinks)
        this.id = id
    }

    id: number
}

export class VulnLibListDto {

    constructor(
        id: number,
        name: string,
        description: string,
        company: string,
        product: string,
        affectedVersions: string,
        standard: boolean,
        creationDate: Date,
        modificationDate: Date,
        cweType: string,
        cvss: number,
        cvssVector: string,
        lang: string
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.company = company
        this.product = product
        this.affectedVersions = affectedVersions
        this.standard = standard
        this.creationDate = creationDate
        this.modificationDate = modificationDate
        this.cweType = cweType
        this.cvss = cvss
        this.cvssVector = cvssVector
        this.lang = lang
    }

    id: number
    name: string
    description: string
    company: string
    product: string
    affectedVersions: string
    standard: boolean
    creationDate: Date
    modificationDate: Date
    cweType: string
    cvss: number
    cvssVector: string
    lang: string
}

export class VulnLibShowDto extends VulnLibListDto {

    constructor(id: number,
        name: string,
        description: string,
        company: string,
        product: string,
        affectedVersions: string,
        standard: boolean,
        creationDate: Date,
        modificationDate: Date,
        cweType: string,
        cvss: number,
        cvssVector: string,
        lang: string,
        vulnlinks: Array<VulnLinkShowDto>
    ) {
        super(id, name, description, company, product, affectedVersions, standard, creationDate, modificationDate, cweType, cvss, cvssVector, lang)
        this.vulnlinks = vulnlinks
    }

    vulnlinks: Array<VulnLinkShowDto>
}

export class VulnLibSearch {

    constructor(
        name: string,
        company: string,
        product: string,
        affectedVersions: string,
        cweType: string,
        lang: string
    ) {
        this.name = name
        this.company = company
        this.product = product
        this.affectedVersions = affectedVersions
        this.cweType = cweType
        this.lang = lang
    }

    name: string
    company: string
    product: string
    affectedVersions: string
    cweType: string
    lang: string
}

export class VulnLinkCreateDto {

    constructor(websiteName: string, url: string) {
        this.websiteName = websiteName
        this.url = url
    }

    websiteName: string
    url: string
}

export class VulnLinkShowDto extends VulnLinkCreateDto {

    constructor(websiteName: string, url: string, id: number) {
        super(websiteName, url)
        this.id = id
    }

    id: number

}

