export class Task {

    constructor(
        id: number,
        start_date: string,
        text: string,
        progress: number,
        duration: number,
        parent: number,
        users: string
    ) {
        this.id = id
        this.start_date = start_date
        this.text = text
        this.progress = progress
        this.duration = duration
        this.parent = parent
        this.users = users
    }

    id: number;
    start_date: string;
    text: string;
    progress: number;
    duration: number;
    parent: number;
    users: string
}