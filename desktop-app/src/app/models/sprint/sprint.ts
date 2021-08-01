import { Project } from "../project/project"

export class SprintCreate {
    title: string
    description: string
    startDate: Date
    estimatedDate: Date
    projectId: number

    constructor(
        title: string,
        description: string,
        startDate: Date,
        estimatedDate: Date,
        projectId: number
    ) {
        this.title = title
        this.description = description
        this.startDate = startDate
        this.estimatedDate = estimatedDate
        this.projectId = projectId
    }
}

export class SprintUpdate {
    id: number
    title: string
    description: string
    startDate: Date
    estimatedDate: Date

    constructor(
        id: number,
        title: string,
        description: string,
        startDate: Date,
        estimatedDate: Date
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.startDate = startDate
        this.estimatedDate = estimatedDate
    }

}

export class SprintShow {
    id: number
    number: number
    title: string
    description: string
    startDate: Date
    estimatedDate: Date
    closeDate: Date

    constructor(
        id: number,
        number: number,
        title: string,
        description: string,
        startDate: Date,
        estimatedDate: Date,
        closeDate: Date
    ) {
        this.id = id
        this.number = number
        this.title = title
        this.description = description
        this.startDate = startDate
        this.estimatedDate = estimatedDate
        this.closeDate = closeDate
    }

}

export class Sprint {
    id: number
    number: number
    title: string
    description: string
    creationDate: Date
    startDate: Date
    estimatedDate: Date
    closeDate: Date
    project: Project
    active: boolean

    constructor(
        id: number,
        number: number,
        title: string,
        description: string,
        creationDate: Date,
        startDate: Date,
        estimatedDate: Date,
        closeDate: Date,
        project: Project,
        active: boolean
    ) {
        this.id = id
        this.number = number
        this.title = title
        this.description = description
        this.creationDate = creationDate
        this.startDate = startDate
        this.estimatedDate = estimatedDate
        this.closeDate = closeDate
        this.project = project
        this.active = active
    }

}