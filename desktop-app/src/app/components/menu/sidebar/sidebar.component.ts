import { Component, OnInit } from "@angular/core";
import { Router } from '@angular/router';
import { TokenService } from "src/app/services/authentication/token.service";
import { UserService } from "src/app/services/user/user.service";

@Component({
    selector: 'iMan-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

    constructor(private tokenService: TokenService, private userService: UserService, private router: Router) {
    }

    ngOnInit(): void {
        this.userService.reloadProfileImage()
    }

    onLogout(): void {
        this.tokenService.logOut();
        this.router.navigate(["/login"])
        // this.reloadWindow();
    }

    reloadWindow() {
        window.location.reload()
    }

    public getProfileImageUrl(): any {
        return this.userService.imageUrl
    }
}