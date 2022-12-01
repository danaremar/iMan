import { Component, Input, OnInit } from "@angular/core";
import { ShowUser } from "src/app/models/user/show-user";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: 'show-user',
    templateUrl: './show_user.component.html',
    styleUrls: ['./show_user.component.css']
})
export class ShowUserPhoto implements OnInit {

    // INPUTS

    @Input()
    showProfileImage: boolean = true

    @Input()
    showUsername: boolean = true

    @Input()
    user: ShowUser | undefined


    // INIT

    @Input()
    username: string = ''

    @Input()
    imageUrl: string = ''

    @Input()
    showMargin: boolean = true


    ngOnInit(): void {
        if (this.user != undefined) {
            this.username = this.user.username
            this.imageUrl = this.getProfileImageUrlFromUser(this.user)
        } else if (this.imageUrl != '') {
            let p = this.userService.getUrlFromProfile(this.imageUrl)
            this.imageUrl = p?p:this.imageUrl
        }

    }


    // CONSTRUCTOR
    constructor(public userService: UserService) {

    }


    // PROFILE IMAGE
    public getProfileImageUrlFromUser(user: ShowUser): any {
        return this.userService.getUrlFromProfile(user.imageUid)
    }



}