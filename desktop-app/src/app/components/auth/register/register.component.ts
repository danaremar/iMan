import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { TokenService } from "src/app/services/authentication/token.service";
import { NewUser } from "src/app/models/user/new-user"
import { LoginUser } from "src/app/models/user/login-user";
import { CountryService } from "src/app/services/util/country-service";

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    isRegistered = false
    isLogged = false
    isLoginFail = false;
    newUser: NewUser | undefined
    messageError: string | undefined
    formRegister: FormGroup
    loginUser: LoginUser | undefined
    countriesDictionary: any = this.countryService.getAllCountriesByISO3166()
    countries: any = Object.values(this.countriesDictionary)

    constructor(private tokenService: TokenService, private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private router: Router, private countryService: CountryService) {
        this.formRegister = formBuilder.group({
            name: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            username: ['', [Validators.required]],
            password: ['', [Validators.required]],
            country: ['', [Validators.required]],
            sector: ['', [Validators.required]],
        })
    }

    ngOnInit(): void {
        if (this.tokenService.getToken()) {
            this.isLogged = true
            this.isRegistered = true
            this.router.navigateByUrl("/index")
        }
    }

    getKeyByValue(object: any, value: any) {
        return Object.keys(object).find(key => object[key] === value);
    }

    onRegister() {
        // Get full country name & return only 2 characters ISO code
        const country = this.getKeyByValue(this.countriesDictionary, this.formRegister.value.country)

        this.newUser = new NewUser(this.formRegister.value.username, this.formRegister.value.password,
            this.formRegister.value.name, this.formRegister.value.lastName, this.formRegister.value.email,
            country==undefined?"":country, this.formRegister.value.sector)

        this.authenticationService.register(this.newUser).subscribe(
            response => {
                this.isRegistered = true

                this.loginUser = new LoginUser(this.formRegister.value.username, this.formRegister.value.password)
                this.authenticationService.login(this.loginUser).subscribe(
                    responseLogin => {
                        this.isLogged = true

                        this.tokenService.setToken(responseLogin.token)
                        this.tokenService.setUsername(responseLogin.username)

                        this.router.navigateByUrl("/index")
                    },
                    errLogin => {
                        this.isLoginFail = true
                        var returned_error = errLogin.error.text
                        if (returned_error == undefined) {
                            returned_error = 'Incorrect user'
                        }
                        this.messageError = returned_error;
                    }
                )
            },
            err => {
                this.isLoginFail = true
                var returned_error = err.error.text
                if (returned_error == undefined) {
                    returned_error = 'Incorrect user'
                }
                this.messageError = returned_error;
            }
        )
    }

    inputClass(form: FormGroup, property: string) {
        if (form?.get(property)?.touched && form?.get(property)?.valid) {
            return "is-valid"
        } else if (form?.get(property)?.touched && form?.get(property)?.invalid) {
            return "is-invalid"
        } else {
            return ""
        }
    }

}