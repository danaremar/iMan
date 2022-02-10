import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserUpdate } from "src/app/models/user/update-user";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { UserService } from "src/app/services/user/user.service";
import { CountryService } from "src/app/services/util/country-service";
import { ImanSubmodule } from "../submodule.component";

@Component({
    selector: 'iMan-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent extends ImanSubmodule implements OnInit {


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

    constructor(private userService: UserService, private countryService: CountryService,effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService) {
        super(effortService,kanbanService,sprintService,projectService,formBuilder,tokenService)
        
        this.formUpdateProfile = formBuilder.group({
            name: ['', [Validators.required]],
            lastName: ['', [Validators.required]],
            email: ['', [Validators.required]],
            username: ['', [Validators.required]],
            oldPassword: ['', [Validators.required]],
            newPassword: ['', []],
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
                let country = this.countriesDictionary[this.myProfile.country]
                this.formUpdateProfile = this.formBuilder.group({
                    name: [this.myProfile.name, [Validators.required]],
                    lastName: [this.myProfile.lastName, [Validators.required]],
                    email: [this.myProfile.email, [Validators.required]],
                    username: [this.myProfile.username, [Validators.required]],
                    oldPassword: ['', [Validators.required]],
                    newPassword: ['', []],
                    country: [country, [Validators.required]],
                    sector: [this.myProfile.sector, [Validators.required]],
                })
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    editProfile() {
        if (confirm("Are you sure to modify your profile?")) {
            let country = this.getKeyByValue(this.countriesDictionary, this.formUpdateProfile.value.country)
            let userUpdate: UserUpdate = new UserUpdate(this.formUpdateProfile.value.username, this.formUpdateProfile.value.name, this.formUpdateProfile.value.lastName, this.formUpdateProfile.value.email, country == undefined ? "" : country, this.formUpdateProfile.value.sector, this.formUpdateProfile.value.oldPassword, this.formUpdateProfile.value.newPassword)
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

    public getProfileImageUrl(): any {
        return this.userService.imageUrl
    }

    uploadProfileImage(images: any) {
        var file: File = images.files[0]
        if(file && file.size > 4000000) {
            this.returnPrincipalError('Profile image can\'t be bigger than 4MB')
        } else if(file?.type != 'image/jpeg' && file?.type != 'image/jpg' && file?.type != 'image/png'){
            this.returnPrincipalError('Profile image must be jpeg, jpg or png')
        } else {
            this.userService.uploadUserImageProfile(file).subscribe(
                data => {
                    this.userService.reloadProfileImage()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }

    }

    deleteProfileImage() {
        if (confirm("Are you sure to change your profile image?")) {
            this.userService.deleteUserImageProfile().subscribe(
                data => {
                    this.userService.reloadProfileImage()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }

}