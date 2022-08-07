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

export class ActiveUsersShowDto extends ActiveUsersCreateDto {


    constructor(id: number,
        status: string,
        serial: string,
        notes: string,
        ips: string,
        username: string
    ) {
        super(status, serial, notes, ips, username)
        this.id = id
    }

    id: number

}