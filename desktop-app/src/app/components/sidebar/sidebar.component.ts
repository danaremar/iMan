import { Component, OnInit } from "@angular/core";
import { TokenService } from "src/app/services/authentication/token.service";
declare var $: any;
declare var bootstrap: any;

@Component({
    selector: 'iMan-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {

    constructor(private tokenService: TokenService) { }

    ngOnInit(): void {
        // If it's neccesary
    }

    onLogout(): void {
        this.tokenService.logOut();
        this.reloadWindow();
    }

    reloadWindow() {
        window.location.reload()
    }
}