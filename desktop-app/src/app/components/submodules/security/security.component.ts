import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { UserService } from "src/app/services/user/user.service";
import { ImanSubmodule } from "../submodule.component";

@Component({
    selector: 'iMan-security',
    templateUrl: './security.component.html',
    styleUrls: ['./security.component.css'],
})
export class SecurityComponent implements OnInit {

    ngOnInit(): void {
    }
    
}