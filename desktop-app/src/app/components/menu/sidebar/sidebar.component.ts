import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/authentication/token.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: 'iMan-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

    constructor(private tokenService: TokenService, private userService: UserService) {
    }

    ngOnInit(): void {
        this.userService.reloadProfileImage()
    }

    onLogout(): void {
        this.tokenService.logOut();
        this.reloadWindow();
    }

    reloadWindow() {
        window.location.reload()
    }

    public getProfileImageUrl(): any {
        return this.userService.imageUrl
    }
}