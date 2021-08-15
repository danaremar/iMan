import { KanbanTask } from "./kanbanTask"

export class KanbanColumnCreate {

    constructor(title: string, sprintId: number) {
        this.title = title
        this.sprintId = sprintId
    }

    title: string
    sprintId: number
}

export class KanbanColumnShow {

    constructor(
        id: number,
        title: string,
        columnOrder: number,
        tasks: Array<KanbanTask>
    ) {
        this.id = id
        this.title = title
        this.columnOrder = columnOrder
        this.tasks = tasks
    }

    id: number
    title: string
    columnOrder: number
    tasks: Array<KanbanTask>
}

export class KanbanColumnUpdate {

    constructor(id: number, title: string, columnOrder: number) {
        this.id = id
        this.title = title
        this.columnOrder = columnOrder
    }

    id: number
    title: string
    columnOrder: number
}

export class KanbanColumn {

    constructor(
        id: number,
        title: string,
        columnOrder: number,
        active: boolean,
        tasks: Array<KanbanTask>
    ) {
        this.id = id
        this.title = title
        this.columnOrder = columnOrder
        this.active = active
        this.tasks = tasks
    }

    id: number
    title: string
    columnOrder: number
    active: boolean
    tasks: Array<KanbanTask>
}