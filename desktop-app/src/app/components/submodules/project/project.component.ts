import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewProject, Project, UpdateProject } from "src/app/models/project/project";
import { CreateProjectRole, UpdateProjectRole } from "src/app/models/project/roles";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { TokenService } from "src/app/services/authentication/token.service";
import { ProjectService } from "src/app/services/projects/project.service";

@Component({
    selector: 'iMan-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

    @ViewChild('closebuttonNew') closebuttonNew: any;
    @ViewChild('closebuttonUpdate') closebuttonUpdate: any;
    @ViewChild('closebuttonUsers') closebuttonUsers: any;

    myProjects: any
    myRoles: any
    selectedProject: number = 0

    containError: boolean = false
    messageError: string | undefined

    formNewProject: FormGroup
    newProjectContainError: boolean = false
    newProjectMessageError: string | undefined

    formUpdateProject: FormGroup
    updateProjectContainError: boolean = false
    updateProjectMessageError: string | undefined

    formNewProjectRole: FormGroup
    newProjectRoleContainError: boolean = false
    newProjectRoleMessageError: string | undefined

    rolesDictionary: any = this.projectService.getAllRoles()
    roles: any = Object.values(this.rolesDictionary)

    constructor(private projectService: ProjectService, private formBuilder: FormBuilder, private tokenService: TokenService) {
        this.formNewProject = formBuilder.group({
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })

        this.formUpdateProject = formBuilder.group({
            id: ['', [Validators.required]],
            name: ['', [Validators.required]],
            description: ['', [Validators.required]],
        })

        this.formNewProjectRole = formBuilder.group({
            username: ['', [Validators.required]],
            role: ['Member', [Validators.required]],
        })
    }

    ngOnInit(): void {
        this.loadMyProjects()
    }

    loadMyProjects(): any {
        this.projectService.myProjects().subscribe(
            data => {
                this.myProjects = data
                this.loadMyRoles()
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

    loadMyRoles() {
        this.myRoles = []       // clear
        for (var project of this.myProjects) {
            loopRole:
            for (var role of project.projectRoles) {
                if (role.user.username == this.tokenService.getUsername()) {
                    this.myRoles.push(role.role)
                    break loopRole
                }
            }
        }
    }

    newProject() {
        let newProject: NewProject = new NewProject(this.formNewProject.value.name, this.formNewProject.value.description)

        this.projectService.createProject(newProject).subscribe(
            res => {
                this.closebuttonNew.nativeElement.click();
                this.newProjectContainError = false
                this.formNewProject.reset()
                this.loadMyProjects()           // refresh my projects from API
            },
            err => {
                this.newProjectContainError = true
                this.newProjectMessageError = err.error.text
            }
        )
    }

    fillUpdateForm(project: Project) {
        this.formUpdateProject = this.formBuilder.group({
            id: [project.id, [Validators.required]],
            name: [project.name, [Validators.required]],
            description: [project.description, [Validators.required]],
        })
    }

    updateProject() {
        let project: UpdateProject = new UpdateProject(this.formUpdateProject.value.id, this.formUpdateProject.value.name, this.formUpdateProject.value.description)

        this.projectService.updateProject(project).subscribe(
            res => {
                this.closebuttonUpdate.nativeElement.click();
                this.updateProjectContainError = false
                this.formNewProject.reset()
                this.loadMyProjects()           // refresh my projects from API
            },
            err => {
                this.updateProjectContainError = true
                this.updateProjectMessageError = err.error.text
            }
        )
    }

    enableDisableProject(projectId: number) {
        this.projectService.enableDisableProject(projectId).subscribe(
            res => {
                this.containError = false
                this.loadMyProjects()           // refresh my projects from API
            },
            err => {
                this.containError = true
                this.messageError = err.error.text
            }
        )
    }

    newProjectRole() {
        let role = Number(this.getKeyByValue(this.rolesDictionary, this.formNewProjectRole.value.role))

        let newProjectRole: CreateProjectRole = new CreateProjectRole(this.myProjects[this.selectedProject].id,
            this.formNewProjectRole.value.username, role)

        this.projectService.createProjectRole(newProjectRole).subscribe(
            res => {
                this.formNewProjectRole.reset()
                this.formNewProjectRole.controls['role'].setValue('Member')
                this.loadMyProjects()
                this.closebuttonUsers.nativeElement.click()
            },
            err => {
                var retErr = err.error.text
                if(retErr == undefined){
                    retErr = "Error adding the user"
                }
                this.newProjectRoleContainError = true
                this.newProjectRoleMessageError = retErr
            }
        )
    }

    updateProjectRole(role: any, roleTypeEvent: any) {
        console.log('Me intento actualizar')
        let roleTypeStr = roleTypeEvent.value

        let roleType = Number(this.getKeyByValue(this.rolesDictionary, roleTypeStr))

        let updateProjectRole: UpdateProjectRole = new UpdateProjectRole(role.id, roleType)

        this.projectService.updateProjectRole(updateProjectRole).subscribe(
            res => {
                this.loadMyProjects()
                this.closebuttonUsers.nativeElement.click()
            }, 
            err => {
                var retErr = err.error.text
                if(retErr == undefined){
                    retErr = "Error updating the user"
                }
                this.newProjectRoleContainError = true
                this.newProjectRoleMessageError = retErr
            }
        )
    }

    getRole(role: number) {
        switch (role) {
            case 0: return 'Owner'
            case 1: return 'Admin'
            case 2: return 'Member'
            default: return 'Visitor'
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