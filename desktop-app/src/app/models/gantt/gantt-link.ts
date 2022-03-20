export class Link {

    constructor(
        id: number,
        source: number,
        target: number,
        type: string
    ) {
        this.id = id
        this.source = source
        this.target = target
        this.type = type
    }

    id: number;
    source: number;
    target: number;
    type: string;
}