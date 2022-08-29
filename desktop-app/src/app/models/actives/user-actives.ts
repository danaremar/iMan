import { ShowUser } from "../user/show-user"

export class ActiveUsersCreateDto {

    constructor(
        status: string,
        serial: string,
        notes: string,
        ips: string,
        username: string
    ) {
        this.status = status
        this.serial = serial
        this.notes = notes
        this.ips = ips
        this.username = username
    }

    status: string
    serial: string
    notes: string
    ips: string
    username: string
}

export class ActiveUsersShowDto {

    constructor(
        id: number,
        status: string,
        serial: string,
        notes: string,
        ips: string,
        user: ShowUser
    ) {
        this.id = id
        this.status = status
        this.serial = serial
        this.notes = notes
        this.ips = ips
        this.user = user
    }

    id: number
    status: string
    serial: string
    notes: string
    ips: string
    user: ShowUser
}