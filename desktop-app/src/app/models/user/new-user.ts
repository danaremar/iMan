export class NewUser {
    
    username: string
    password: string
    name: string
    lastName: string
    email: string
    country: string
    sector: string

    constructor(username: string, password: string, name: string, lastName: string, email: string, country: string, sector: string) {
        this.username = username
        this.password = password
        this.name = name
        this.lastName = lastName
        this.email = email
        this.country = country
        this.sector = sector
    }
}
