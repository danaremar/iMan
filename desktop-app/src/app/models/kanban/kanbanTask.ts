import { KanbanColumn } from "./kanbanColumn"

export class KanbanTaskCreate {

    constructor(
        title: string,
        description: string,
        estimatedTime: number,
        kanbanColumnId: number
    ) {
        this.title = title
        this.description = description
        this.estimatedTime = estimatedTime
        this.kanbanColumnId = kanbanColumnId
    }

    title: string
    description: string
    estimatedTime: number
    kanbanColumnId: number
}

export class KanbanTaskUpdate {

    constructor(
        id: number,
        title: string,
        description: string,
        estimatedTime: number
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.estimatedTime = estimatedTime
    }

    id: number
    title: string
    description: string
    estimatedTime: number
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
        kanbanColumn: KanbanColumn
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
}