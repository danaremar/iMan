import { Component, OnInit } from "@angular/core";
import { environment } from "src/environments/environment";

@Component({
    selector: 'iMan-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    enabledElectron: boolean = false

    ngOnInit(): void {
        this.enabledElectron = environment.enableElectron
    }

}