import { ShowUser } from "../user/show-user"

export class Project {

    constructor(id: number, name: string, description: string, creationDate: Date, closeDate: Date, active: boolean, projectRoles: ProjectRole) {
        this.id=id
        this.name=name
        this.description=description
        this.creationDate=creationDate
        this.closeDate=closeDate
        this.active=active
        this.projectRoles=projectRoles
    }

    id: number
    name: string
    description: string
    creationDate: Date
    closeDate: Date
    active: boolean
    projectRoles: ProjectRole


}

export class ProjectRole {
    constructor(id: number, user: ShowUser, role: number, accepted: boolean) {
        this.id = id
        this.user = user
        this.role = role
        this.accepted = accepted
    }

    id: number
    user: ShowUser
    role: number
    accepted: boolean
}