import { ShowUser } from "../user/show-user"

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

export class CreateProjectRole {
    constructor(projectId: number, username: string, role: number) {
        this.projectId=projectId
        this.username=username
        this.role=role
    }
    projectId: number
    username: string
    role: number
}

export class UpdateProjectRole {
    constructor(id: number, role: number) {
        this.id=id
        this.role=role
    }
    id: number
    role: number
}