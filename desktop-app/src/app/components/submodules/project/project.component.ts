import { Component, OnInit } from "@angular/core";
import { Project } from "src/app/models/project/project";
import { ProjectService } from "src/app/services/projects/project.service";

@Component({
    selector: 'iMan-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    myProjects: any

    containError: boolean = false
    messageError: string | undefined

    constructor(private projectService: ProjectService) {
    }

    ngOnInit(): void {
        this.loadMyProjects()
    }

    loadMyProjects(): any {
        this.projectService.myProjects().subscribe(
            data => {
                this.myProjects = data
            },
            err => {
                var returned_error = err.error.text
                if (returned_error == undefined) {
                    returned_error = 'Ha ocurrido un error'
                }
                this.messageError = returned_error;
                this.containError = true
            }
        )
    }

    

}