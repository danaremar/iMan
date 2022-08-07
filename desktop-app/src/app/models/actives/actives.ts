import { ShowUser } from "../user/show-user"
import { ActiveUsersCreateDto, ActiveUsersShowDto } from "./user-actives"

export class ActiveCreateDto {

    constructor(
        name: string,
        description: string,
        type: string,
        company: string,
        product: string,
        version: string,
        cpeType: string,
        cpe: string,
        importance: string,
        startAdquisition: Date,
        endAdquisition: Date,
        endOfLife: Date,
        cost: number,
        periodicity: string,
        subscriptionType: string,
        location: string,
        children: Array<number>,
        activeUsers: Array<ActiveUsersCreateDto>,
        projectId: number
    ) {
        this.name = name
        this.description = description
        this.type = type
        this.company = company
        this.product = product
        this.version = version
        this.cpeType = cpeType
        this.cpe = cpe
        this.importance = importance
        this.startAdquisition = startAdquisition
        this.endAdquisition = endAdquisition
        this.endOfLife = endOfLife
        this.cost = cost
        this.periodicity = periodicity
        this.subscriptionType = subscriptionType
        this.location = location
        this.children = children
        this.activeUsers = activeUsers
        this.projectId = projectId
    }

    name: string
    description: string
    type: string
    company: string
    product: string
    version: string
    cpeType: string
    cpe: string
    importance: string
    startAdquisition: Date
    endAdquisition: Date
    endOfLife: Date
    cost: number
    periodicity: string
    subscriptionType: string
    location: string
    children: Array<number>
    activeUsers: Array<ActiveUsersCreateDto>
    projectId: number

}

export class ActiveUpdateDto {

    constructor(
        id: number,
        name: string,
        description: string,
        type: string,
        company: string,
        product: string,
        version: string,
        cpeType: string,
        cpe: string,
        importance: string,
        startAdquisition: Date,
        endAdquisition: Date,
        endOfLife: Date,
        cost: number,
        periodicity: string,
        subscriptionType: string,
        location: string,
        children: Array<number>,
        activeUsers: Array<ActiveUsersCreateDto>
    ) {
        this.id = id
        this.name = name
        this.description = description
        this.type = type
        this.company = company
        this.product = product
        this.version = version
        this.cpeType = cpeType
        this.cpe = cpe
        this.importance = importance
        this.startAdquisition = startAdquisition
        this.endAdquisition = endAdquisition
        this.endOfLife = endOfLife
        this.cost = cost
        this.periodicity = periodicity
        this.subscriptionType = subscriptionType
        this.location = location
        this.children = children
        this.activeUsers = activeUsers
    }

    id: number
    name: string
    description: string
    type: string
    company: string
    product: string
    version: string
    cpeType: string
    cpe: string
    importance: string
    startAdquisition: Date
    endAdquisition: Date
    endOfLife: Date
    cost: number
    periodicity: string
    subscriptionType: string
    location: string
    children: Array<number>
    activeUsers: Array<ActiveUsersCreateDto>
}

export class ActiveSearchDto {

    constructor(
        code: number,
        name: string,
        description: string,
        creationDate: Date,
        createdBy: string,
        lastModification: Date,
        modifiedBy: string,
        type: string,
        company: string,
        product: string,
        version: string,
        cpeType: string,
        cpe: string,
        importance: string,
        startAdquisition: Date,
        endAdquisition: Date,
        endOfLife: Date,
        cost: number,
        periodicity: string,
        subscriptionType: string,
        location: string
    ) {
        this.code = code
        this.name = name
        this.description = description
        this.creationDate = creationDate
        this.createdBy = createdBy
        this.lastModification = lastModification
        this.modifiedBy = modifiedBy
        this.type = type
        this.company = company
        this.product = product
        this.version = version
        this.cpeType = cpeType
        this.cpe = cpe
        this.importance = importance
        this.startAdquisition = startAdquisition
        this.endAdquisition = endAdquisition
        this.endOfLife = endOfLife
        this.cost = cost
        this.periodicity = periodicity
        this.subscriptionType = subscriptionType
        this.location = location
    }

    code: number
    name: string
    description: string
    creationDate: Date
    createdBy: string
    lastModification: Date
    modifiedBy: string
    type: string
    company: string
    product: string
    version: string
    cpeType: string
    cpe: string
    importance: string
    startAdquisition: Date
    endAdquisition: Date
    endOfLife: Date
    cost: number
    periodicity: string
    subscriptionType: string
    location: string
}

export class ActiveListDto {

    constructor(
        id: number,
        code: number,
        name: string,
        description: string,
        creationDate: Date,
        createdBy: ShowUser,
        lastModification: Date,
        modifiedBy: ShowUser,
        type: string,
        company: string,
        product: string,
        version: string,
        cpeType: string,
        cpe: string,
        importance: string,
        startAdquisition: Date,
        endAdquisition: Date,
        endOfLife: Date,
        cost: number,
        periodicity: string,
        subscriptionType: string,
        location: string
    ) {
        this.id = id
        this.code = code
        this.name = name
        this.description = description
        this.creationDate = creationDate
        this.createdBy = createdBy
        this.lastModification = lastModification
        this.modifiedBy = modifiedBy
        this.type = type
        this.company = company
        this.product = product
        this.version = version
        this.cpeType = cpeType
        this.cpe = cpe
        this.importance = importance
        this.startAdquisition = startAdquisition
        this.endAdquisition = endAdquisition
        this.endOfLife = endOfLife
        this.cost = cost
        this.periodicity = periodicity
        this.subscriptionType = subscriptionType
        this.location = location
    }

    id: number
    code: number
    name: string
    description: string
    creationDate: Date
    createdBy: ShowUser
    lastModification: Date
    modifiedBy: ShowUser
    type: string
    company: string
    product: string
    version: string
    cpeType: string
    cpe: string
    importance: string
    startAdquisition: Date
    endAdquisition: Date
    endOfLife: Date
    cost: number
    periodicity: string
    subscriptionType: string
    location: string
}

export class ActiveShowChildrenDto {

    constructor(
        id: number,
        code: number,
        name: string,
        description: string,
        children: Array<ActiveShowChildrenDto>
    ) {
        this.id = id
        this.code = code
        this.name = name
        this.description = description
        this.children = children
    }

    id: number
    code: number
    name: string
    description: string
    children: Array<ActiveShowChildrenDto>
}

export class ActiveShowDto extends ActiveListDto {

    constructor(
        id: number,
        code: number,
        name: string,
        description: string,
        creationDate: Date,
        createdBy: ShowUser,
        lastModification: Date,
        modifiedBy: ShowUser,
        type: string,
        company: string,
        product: string,
        version: string,
        cpeType: string,
        cpe: string,
        importance: string,
        startAdquisition: Date,
        endAdquisition: Date,
        endOfLife: Date,
        cost: number,
        periodicity: string,
        subscriptionType: string,
        location: string,
        children: Array<ActiveShowChildrenDto>,
        activeUsers: Array<ActiveUsersShowDto>
    ) {
        super(id, code, name, description, creationDate, createdBy, lastModification, modifiedBy, type, company, product, version, cpeType, cpe, importance, startAdquisition, endAdquisition, endOfLife, cost, periodicity, subscriptionType, location)
        this.children = children
        this.activeUsers = activeUsers
    }

    children: Array<ActiveShowChildrenDto>
    activeUsers: Array<ActiveUsersShowDto>

}