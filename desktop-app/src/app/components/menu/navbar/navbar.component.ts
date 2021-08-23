import { Component, OnInit } from "@angular/core";
import { IpcRenderer } from "electron";
// import * as electron from "electron";
import { environment } from "src/environments/environment";

@Component({
    selector: 'iMan-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    enabledElectron: boolean = false
    ipc!: IpcRenderer;

    constructor() {
        if ((<any>window).require) {
            try {
                this.ipc = (<any>window).require('electron').ipcRenderer
            } catch (error) {
                throw error;
            }
        } else {
            console.warn('Could not load electron ipc');
        }
    }

    ngOnInit(): void {
        this.enabledElectron = environment.enableElectron
    }

    minimize() {
        this.ipc.send('minimizeApp')
    }

    maximize() {
        this.ipc.send('maximizeApp')
    }

    close() {
        this.ipc.send('closeApp')
    }


}