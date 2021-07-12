export class NewUser {
    
    username: string
    password: string
    firstName: string
    lastName: string
    email: string
    country: string
    sector: string

    constructor(username: string, password: string, firstName: string, lastName: string, email: string, country: string, sector: string) {
        this.username = username
        this.password = password
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.country = country
        this.sector = sector
    }
}
