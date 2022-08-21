import { ActiveShowDto } from "../actives/actives"
import { ShowUser } from "../user/show-user"
import { VulnLibShowDto } from "./vulnlib"

export class VulnCreateDto {

    constructor(
        name: string,
        description: string,
        creationDate: Date,
        affectedVersion: string,
        newVersion: string,
        affects: boolean,
        notified: boolean,
        fixed: boolean,
        patchType: string,
        patchDate: Date,
        relActiveId: number,
        vulnlibIdLs: Array<number>
    ) {
        this.name = name
        this.description = description
        this.creationDate = creationDate
        this.affectedVersion = affectedVersion
        this.newVersion = newVersion
        this.affects = affects
        this.notified = notified
        this.fixed = fixed
        this.patchType = patchType
        this.patchDate = patchDate
        this.relActiveId = relActiveId
        this.vulnlibIdLs = vulnlibIdLs
    }

    name: string
    description: string
    creationDate: Date
    affectedVersion: string
    newVersion: string
    affects: boolean
    notified: boolean
    fixed: boolean
    patchType: string
    patchDate: Date
    relActiveId: number
    vulnlibIdLs: Array<number>
}

export class VulnUpdateDto extends VulnCreateDto {

    constructor(id: number,
        name: string,
        description: string,
        creationDate: Date,
        affectedVersion: string,
        newVersion: string,
        affects: boolean,
        notified: boolean,
        fixed: boolean,
        patchType: string,
        patchDate: Date,
        relActiveId: number,
        vulnlibIdLs: Array<number>
    ) {
        super(name, description, creationDate, affectedVersion, newVersion, affects, notified, fixed, patchType, patchDate, relActiveId, vulnlibIdLs)
        this.id = id
    }

    id: number
}

export class VulnListDto {

    constructor(
        id: number,
        code: number,
        name: string,
        description: string,
        creationDate: Date,
        affectedVersion: string,
        newVersion: string,
        affects: boolean,
        notified: boolean,
        fixed: boolean,
        patchType: string,
        patchDate: Date,
        createdBy: ShowUser
    ) {
        this.id = id
        this.code = code
        this.name = name
        this.description = description
        this.creationDate = creationDate
        this.affectedVersion = affectedVersion
        this.newVersion = newVersion
        this.affects = affects
        this.notified = notified
        this.fixed = fixed
        this.patchType = patchType
        this.patchDate = patchDate
        this.createdBy = createdBy
    }

    id: number
    code: number
    name: string
    description: string
    creationDate: Date
    affectedVersion: string
    newVersion: string
    affects: boolean
    notified: boolean
    fixed: boolean
    patchType: string
    patchDate: Date
    createdBy: ShowUser
}

export class VulnShowDto extends VulnListDto {

    constructor(id: number,
        code: number,
        name: string,
        description: string,
        creationDate: Date,
        affectedVersion: string,
        newVersion: string,
        affects: boolean,
        notified: boolean,
        fixed: boolean,
        patchType: string,
        patchDate: Date,
        createdBy: ShowUser,
        relActive: ActiveShowDto,
        vulnlib: Array<VulnLibShowDto>
    ) {
        super(id, code, name, description, creationDate, affectedVersion, newVersion, affects, notified, fixed, patchType, patchDate, createdBy)
        this.relActive = relActive
        this.vulnlib = vulnlib
    }

    relActive: ActiveShowDto
    vulnlib: Array<VulnLibShowDto>
}

export class VulnSearchDto {

    constructor(
        code: number,
        name: string,
        description: string,
        creationDate: Date,
        affectedVersion: string,
        newVersion: string,
        affects: boolean,
        notified: boolean,
        fixed: boolean,
        patchType: string,
        patchDate: Date,
        createdBy: string,
        activeCode: number
    ) {
        this.code = code
        this.name = name
        this.description = description
        this.creationDate = creationDate
        this.affectedVersion = affectedVersion
        this.newVersion = newVersion
        this.affects = affects
        this.notified = notified
        this.fixed = fixed
        this.patchType = patchType
        this.patchDate = patchDate
        this.createdBy = createdBy
        this.activeCode = activeCode
    }

    code: number
    name: string
    description: string
    creationDate: Date
    affectedVersion: string
    newVersion: string
    affects: boolean
    notified: boolean
    fixed: boolean
    patchType: string
    patchDate: Date
    createdBy: string
    activeCode: number
}