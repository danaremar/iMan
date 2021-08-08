export class KanbanColumn {

    constructor(
        id: number,
        title: string,
        description: string,
        estimationDate: number,
        creationDate: Date,
        number: number,
        orderInColumn: number,
        active: boolean,
        kanbanColumn: KanbanColumn
    ) {
        this.id = id
        this.title = title
        this.description = description
        this.estimationDate = estimationDate
        this.creationDate = creationDate
        this.number = number
        this.orderInColumn = orderInColumn
        this.active = active
        this.kanbanColumn = kanbanColumn
    }

    id: number
    title: string
    description: string
    estimationDate: number
    creationDate: Date
    number: number
    orderInColumn: number
    active: boolean
    kanbanColumn: KanbanColumn
}