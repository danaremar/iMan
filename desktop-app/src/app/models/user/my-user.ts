export class MyUser {

    constructor(
        username: string,
        name: string,
        lastName: string,
        email: string,
        country: string,
        sector: string
    ) {
        this.username = username
        this.name = name
        this.lastName = lastName
        this.email = email
        this.country = country
        this.sector = sector
    }

    username: string
    name: string
    lastName: string
    email: string
    country: string
    sector: string
}