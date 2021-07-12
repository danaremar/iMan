import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { LoginUser } from "src/app/models/user/login-user";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { TokenService } from "src/app/services/authentication/token.service";


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    isLogged = false
    isLoginFail = false;
    loginUser: LoginUser | undefined
    messageError: string | undefined
    formLogin: FormGroup

    constructor(private tokenService: TokenService, private authenticationService: AuthenticationService, private formBuilder: FormBuilder, private router: Router) {
        this.formLogin = formBuilder.group({
            username: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
        })
    }

    ngOnInit(): void {
        if (this.tokenService.getToken()) {
            this.isLogged = true
        }
    }

    onLogin() {
        this.loginUser = new LoginUser(this.formLogin.value.username, this.formLogin.value.password)
        this.authenticationService.login(this.loginUser).subscribe(
            response => {
                this.isLogged = true

                this.tokenService.setToken(response.token)
                this.tokenService.setUsername(response.username)

                this.router.navigateByUrl("/")
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

}