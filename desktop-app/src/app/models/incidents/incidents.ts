import { ShowUser } from "../user/show-user"

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

export class IncidentUpdateDto {

    constructor(
        id: number,
        title: string,
        description: string,
        reported: string
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.reported = reported
    }

    id: number
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
        status: string,
        username: string,
        assignedUsername: string
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
        this.status = status
        this.username = username
        this.assignedUsername = assignedUsername
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
    status: string
    username: string
    assignedUsername: string
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
        status: string,
        username: string,
        assignedUsername: string,
        updates: Array<IncidentUpdateShowDto>
    ) {
        super(id, code, title, description, reported, active, estimatedTime, date, lastModification, priority, affects, status, username, assignedUsername)
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
        priority: number,
        affects: string,
        status: string,
        user: ShowUser,
        assignedUser: ShowUser
    ) {
        this.id = id
        this.description = description
        this.estimatedTime = estimatedTime
        this.date = date
        this.priority = priority
        this.affects = affects
        this.status = status
        this.user = user
        this.assignedUser = assignedUser
    }

    id: number
    description: string
    estimatedTime: number
    date: Date
    priority: number
    affects: string
    status: string
    user: ShowUser
    assignedUser: ShowUser
}

export class IncidentUpdateCreateDto {

    constructor(
        description: string,
        estimatedTime: number,
        affects: string,
        priority: number,
        status: string,
        assignedUsername: string
    ) {
        this.description = description
        this.estimatedTime = estimatedTime
        this.affects = affects
        this.priority = priority
        this.status = status
        this.assignedUsername = assignedUsername
    }

    description: string
    estimatedTime: number
    affects: string
    priority: number
    status: string
    assignedUsername: string
}