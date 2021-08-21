import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MyUser } from "src/app/models/user/my-user";
import { UserUpdate } from "src/app/models/user/update-user";
import { TokenService } from "src/app/services/authentication/token.service";
import { UserService } from "src/app/services/user/user.service";
import { CountryService } from "src/app/services/util/country-service";

@Component({
    selector: 'iMan-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


    /***************************
            GENERAL
    ***************************/

    myProfile: any

    formUpdateProfile: FormGroup
    containError: boolean = false
    messageError: string | undefined

    countriesDictionary: any = this.countryService.getAllCountriesByISO3166()
    countries: any = Object.values(this.countriesDictionary)

    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(private userService: UserService, private countryService: CountryService, private formBuilder: FormBuilder, private tokenService: TokenService) {
        this.formUpdateProfile = formBuilder.group({
            name: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            username: ['', [Validators.required]],
            oldPassword: ['', [Validators.required]],
            newPassword: ['', [Validators.required]],
            country: ['', [Validators.required]],
            sector: ['', [Validators.required]],
        })
    }


    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit(): void {
        this.loadMyProfile()
    }

    loadMyProfile() {
        this.userService.getMyProfile().subscribe(
            data => {
                this.myProfile = data
                this.formUpdateProfile = this.formBuilder.group({
                    name: [this.myProfile.name, [Validators.required]],
                    lastName: [this.myProfile.lastName, [Validators.required]],
                    email: [this.myProfile.email, [Validators.required]],
                    username: [this.myProfile.username, [Validators.required]],
                    oldPassword: ['', [Validators.required]],
                    newPassword: ['', [Validators.required]],
                    country: [this.myProfile.country, [Validators.required]],
                    sector: [this.myProfile.sector, [Validators.required]],
                })
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    returnPrincipalError(err: any) {
        var r = err.error.text
        if (r == undefined) {
            r = 'Error produced'
        }
        this.messageError = r;
        this.containError = true
    }

    editProfile() {
        if (confirm("Are you sure to modify your profile?")) {
            let userUpdate: UserUpdate = new UserUpdate(this.formUpdateProfile.value.username, this.formUpdateProfile.value.name, this.formUpdateProfile.value.lastName, this.formUpdateProfile.value.email, this.formUpdateProfile.value.country, this.formUpdateProfile.value.sector, this.formUpdateProfile.value.oldPassword, this.formUpdateProfile.value.newPassword)
            this.userService.updateProfile(userUpdate).subscribe(
                data => {
                    this.containError = false
                    this.loadMyProfile()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }

    getKeyByValue(object: any, value: any) {
        return Object.keys(object).find(key => object[key] === value);
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