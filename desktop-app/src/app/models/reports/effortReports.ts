import { KanbanTask } from "../kanban/kanbanTask"
import { ShowUser } from "../user/show-user"

export class EffortReport {
    constructor(
        totalComputedTime: number,
        totalEstimedTime: number,
        effortsByTask: EffortByTask,
        effortsByUser: EffortByUser
    ) {
        this.totalComputedTime = totalComputedTime
        this.totalEstimedTime = totalEstimedTime
        this.effortsByTask = effortsByTask
        this.effortsByUser = effortsByUser
    }

    totalComputedTime: number
    totalEstimedTime: number
    effortsByTask: EffortByTask
    effortsByUser: EffortByUser
}

export class EffortByTask {
    constructor(
        kanbanTask: KanbanTask,
        computedEffort: number,
        estimedEffort: number,
        percentageEffort: number
    ) {
        this.kanbanTask = kanbanTask
        this.computedEffort = computedEffort
        this.estimedEffort = estimedEffort
        this.percentageEffort = percentageEffort
    }

    kanbanTask: KanbanTask
    computedEffort: number
    estimedEffort: number
    percentageEffort: number
}

export class EffortByUser {
    constructor(user: ShowUser, computedEffort: number, percentageEffort: number) {
        this.user = user
        this.computedEffort = computedEffort
        this.percentageEffort = percentageEffort
    }

    user: ShowUser
    computedEffort: number
    percentageEffort: number
}