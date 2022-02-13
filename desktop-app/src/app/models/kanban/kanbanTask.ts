import { ShowUser } from "../user/show-user"
import { KanbanColumn } from "./kanbanColumn"

export class KanbanTaskChildrens {

    constructor(id: number, number: number, title: string) {
        this.id = id
        this.number = number
        this.title = title
    }

    id: number
    number: number
    title: string
}

export class KanbanTaskCreate {

    constructor(
        title: string,
        description: string,
        estimatedTime: number,
        kanbanColumnId: number,
        importance: string,
        dueStartDate: Date,
        dueEndDate: Date,
        assignedUsernames: Array<string>,
        childrenIds: Array<number>
    ) {
        this.title = title
        this.description = description
        this.estimatedTime = estimatedTime
        this.kanbanColumnId = kanbanColumnId
        this.importance = importance
        this.dueStartDate = dueStartDate
        this.dueEndDate = dueEndDate
        this.assignedUsernames = assignedUsernames
        this.childrenIds = childrenIds
    }

    title: string
    description: string
    estimatedTime: number
    kanbanColumnId: number
    importance: string
    dueStartDate: Date
    dueEndDate: Date
    assignedUsernames: Array<string>
    childrenIds: Array<number>
}

export class KanbanTaskUpdate {

    constructor(
        id: number,
        title: string,
        description: string,
        estimatedTime: number,
        importance: string,
        dueStartDate: Date,
        dueEndDate: Date,
        assignedUsernames: Array<string>,
        childrenIds: Array<number>
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.estimatedTime = estimatedTime
        this.importance = importance
        this.dueStartDate = dueStartDate
        this.dueEndDate = dueEndDate
        this.assignedUsernames = assignedUsernames
        this.childrenIds = childrenIds
    }

    id: number
    title: string
    description: string
    estimatedTime: number
    importance: string
    dueStartDate: Date
    dueEndDate: Date
    assignedUsernames: Array<string>
    childrenIds: Array<number>
}

export class KanbanTaskMove {

    constructor(kanbanTaskId: number, newKanbanColumnId: number, newPosition: number) {
        this.kanbanTaskId = kanbanTaskId
        this.newKanbanColumnId = newKanbanColumnId
        this.newPosition = newPosition
    }

    kanbanTaskId: number
    newKanbanColumnId: number
    newPosition: number
}

export class KanbanTask {

    constructor(
        id: number,
        title: string,
        description: string,
        estimatedTime: number,
        creationDate: Date,
        number: number,
        orderInColumn: number,
        active: boolean,
        kanbanColumn: KanbanColumn,
        computedTime: number,
        creator: ShowUser,
        importance: string,
        dueStartDate: Date,
        dueEndDate: Date,
        assignedUsers: Array<ShowUser>,
        children: Array<KanbanTask>
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.estimatedTime = estimatedTime
        this.creationDate = creationDate
        this.number = number
        this.orderInColumn = orderInColumn
        this.active = active
        this.kanbanColumn = kanbanColumn
        this.computedTime = computedTime
        this.creator = creator
        this.importance = importance
        this.dueStartDate = dueStartDate
        this.dueEndDate = dueEndDate
        this.assignedUsers = assignedUsers
        this.children = children
    }

    id: number
    title: string
    description: string
    estimatedTime: number
    creationDate: Date
    number: number
    orderInColumn: number
    active: boolean
    kanbanColumn: KanbanColumn
    computedTime: number
    creator: ShowUser
    importance: string
    dueStartDate: Date
    dueEndDate: Date
    assignedUsers: Array<ShowUser>
    children: Array<KanbanTask>
}