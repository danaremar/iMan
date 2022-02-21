export class IncidentCreateDto {

    constructor(
        projectId: number,
        title: string,
        description: string,
        reported: string
    ) {
        this.projectId = projectId
        this.title = title
        this.description = description
        this.reported = reported
    }

    projectId: number
    title: string
    description: string
    reported: string
}

export class IncidentListDto {

    constructor(
        id: number,
        code: number,
        title: string,
        description: string,
        reported: string,
        active: boolean,
        estimatedTime: number,
        date: Date,
        lastModification: Date,
        priority: number,
        affects: string,
        username: string,
        assignatedUsername: string
    ) {
        this.id = id
        this.code = code
        this.title = title
        this.description = description
        this.reported = reported
        this.active = active
        this.estimatedTime = estimatedTime
        this.date = date
        this.lastModification = lastModification
        this.priority = priority
        this.affects = affects
        this.username = username
        this.assignatedUsername = assignatedUsername
    }

    id: number
    code: number
    title: string
    description: string
    reported: string
    active: boolean
    estimatedTime: number
    date: Date
    lastModification: Date
    priority: number
    affects: string
    username: string
    assignatedUsername: string
}

export class IncidentShowDto extends IncidentListDto {
    constructor(
        id: number,
        code: number,
        title: string,
        description: string,
        reported: string,
        active: boolean,
        estimatedTime: number,
        date: Date,
        lastModification: Date,
        priority: number,
        affects: string,
        username: string,
        assignatedUsername: string,
        updates: Array<IncidentUpdateShowDto>
    ) {
        super(id, code, title, description, reported, active, estimatedTime, date, lastModification, priority, affects, username, assignatedUsername)
        this.updates = updates
    }

    updates: Array<IncidentUpdateShowDto>
}

export class IncidentUpdateShowDto {

    constructor(
        id: number,
        description: string,
        estimatedTime: number,
        date: Date,
        lastModification: Date,
        priority: number,
        affects: string,
        username: string,
        assignatedUsername: string
    ) {
        this.id = id
        this.description = description
        this.estimatedTime = estimatedTime
        this.date = date
        this.lastModification = lastModification
        this.priority = priority
        this.affects = affects
        this.username = username
        this.assignatedUsername = assignatedUsername
    }

    id: number
    description: string
    estimatedTime: number
    date: Date
    lastModification: Date
    priority: number
    affects: string
    username: string
    assignatedUsername: string
}

export class IncidentUpdateCreateDto {

    constructor(
        description: string,
        estimatedTime: number,
        affects: string,
        priority: number,
        status: string,
        assignatedUsername: string
    ) {
        this.description = description
        this.estimatedTime = estimatedTime
        this.affects = affects
        this.priority = priority
        this.status = status
        this.assignatedUsername = assignatedUsername
    }

    description: string
    estimatedTime: number
    affects: string
    priority: number
    status: string
    assignatedUsername: string
}