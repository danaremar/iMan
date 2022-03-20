import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginUser } from "src/app/models/user/login-user";
import { NewUser } from "src/app/models/user/new-user";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { TokenService } from "src/app/services/authentication/token.service";
import { CountryService } from "src/app/services/util/country-service";
import { environment } from "src/environments/environment";


@Component({
    selector: 'iMan-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

    @ViewChild('closebutton') closebutton: any;
    isRegistered = false
    isLogged = false
    isLoginFail = false;
    isRegisterFail = false;
    loginUser: LoginUser | undefined
    newUser: NewUser | undefined
    messageErrorLogin: string | undefined
    messageErrorRegister: string | undefined
    formLogin: FormGroup
    formRegister: FormGroup
    countriesDictionary: any = this.countryService.getAllCountriesByISO3166()
    countries: any = Object.values(this.countriesDictionary)

    enabledElectron: boolean = false

    constructor(private tokenService: TokenService, private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private router: Router, private countryService: CountryService) {
        this.formLogin = formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
        })
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
            this.router.navigateByUrl("/")
        }
        this.enabledElectron = environment.enableElectron
    }

    onLogin() {
        this.loginUser = new LoginUser(this.formLogin.value.username, this.formLogin.value.password)
        this.authenticationService.login(this.loginUser).subscribe(
            response => {
                this.returnLogged(response)
            },
            err => {
                this.returnError(err, true)
            }
        )
    }

    getKeyByValue(object: any, value: any) {
        return Object.keys(object).find(key => object[key] === value);
    }

    onRegister() {
        // Get full country name & return only 2 characters ISO code
        const country = this.getKeyByValue(this.countriesDictionary, this.formRegister.value.country)

        this.newUser = new NewUser(this.formRegister.value.username, this.formRegister.value.password,
            this.formRegister.value.name, this.formRegister.value.lastName, this.formRegister.value.email,
            country == undefined ? "" : country, this.formRegister.value.sector)

        this.authenticationService.register(this.newUser).subscribe(
            response => {
                this.isRegistered = true
                this.closebutton.nativeElement.click();
                this.loginUser = new LoginUser(this.formRegister.value.username, this.formRegister.value.password)
                
                this.authenticationService.login(this.loginUser).subscribe(
                    responseLogin => {
                        this.returnLogged(responseLogin)
                    },
                    errLogin => {
                        this.returnError(errLogin, true)
                    }
                )
            },
            err => {
                this.returnError(err, false)
            }
        )
    }

    returnLogged(responseLogin: any) {
        this.isLogged = true
        this.tokenService.setToken(responseLogin.token)
        this.tokenService.setUsername(responseLogin.username)
        this.router.navigate(["/app/effort"])
    }

    returnError(err: any, isLogin: boolean) {
        var returned_error = err.error.text
        if (returned_error == undefined) {
            returned_error = 'Incorrect user'
        }
        if (isLogin) {
            this.isLoginFail = true
            this.messageErrorLogin = returned_error
        } else {
            this.isRegisterFail = true
            this.messageErrorRegister = returned_error
        }
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