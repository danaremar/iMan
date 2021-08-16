import { KanbanTask } from "../kanban/kanbanTask"
import { UpdateProject } from "../project/project"
import { SprintShow } from "../sprint/sprint"
import { ShowUser } from "../user/show-user"

export class Effort {
    constructor(
        id: number,
        description: string,
        startDate: Date,
        endDate: Date,
        kanbanTask: KanbanTask,
        user: ShowUser,
        time: number,
        sprint: SprintShow,
        project: UpdateProject
    ) {
        this.id = id
        this.description = description
        this.startDate = startDate
        this.endDate = endDate
        this.kanbanTask = kanbanTask
        this.user = user
        this.time = time
        this.sprint = sprint
        this.project = project
    }

    id: number
    description: string
    startDate: Date
    endDate: Date
    kanbanTask: KanbanTask
    user: ShowUser
    time: number
    sprint: SprintShow
    project: UpdateProject
}

export class EffortStart {
    constructor(description: string, kanbanTaskId: number) {
        this.description = description
        this.kanbanTaskId = kanbanTaskId
    }

    description: string
    kanbanTaskId: number
}

export class EffortUpdate {
    constructor(
        id: number,
        description: string,
        kanbanTaskId: number,
        startDate: Date,
        endDate: Date
    ) {
        this.id = id
        this.description = description
        this.kanbanTaskId = kanbanTaskId
        this.startDate = startDate
        this.endDate = endDate
    }

    id: number
    description: string
    kanbanTaskId: number
    startDate: Date
    endDate: Date
}
