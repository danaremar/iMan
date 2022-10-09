import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NewProject, Project, UpdateProject } from "src/app/models/project/project";
import { CreateProjectRole, ProjectRole, UpdateProjectRole } from "src/app/models/project/roles";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { UserService } from "src/app/services/user/user.service";
import { ImanSubmodule } from "../submodule.component";

@Component({
    selector: 'iMan-project',
    templateUrl: './project.component.html',
    styleUrls: ['./project.component.css']
})
export class ProjectComponent extends ImanSubmodule implements OnInit {

    @ViewChild('closebuttonNew') closebuttonNew: any;
    @ViewChild('closebuttonUpdate') closebuttonUpdate: any;
    @ViewChild('closebuttonUsers') closebuttonUsers: any;
    @ViewChild('closebuttonViewInvitations') closebuttonViewInvitations: any;

    myUsername: any
    myRoles: any
    selectedProject: number = 0
    notAcceptedProjects: any

    invitationsContainError: boolean = false
    invitationsMessageError: string | undefined

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

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService, private userService: UserService) {
        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService);
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
        this.myUsername = this.tokenService.getUsername()
        this.loadMyProjects()
    }

    loadMyProjects(): any {
        this.projectService.myProjects().subscribe({
            next: (n) => {
                this.containError = false
                this.myProjects = n
                this.loadMyRoles()
                this.loadNotAcceptedProjects()
            },
            error: (e) => {
                this.returnPrincipalError(e)
            }
        })
    }

    loadMyRoles() {
        this.myRoles = []       // clear
        for (let project of this.myProjects) {
            loopRole:
            for (let role of project.projectRoles) {
                if (role.user.username == this.tokenService.getUsername()) {
                    this.myRoles.push(role.role)
                    break loopRole
                }
            }
        }
    }

    loadNotAcceptedProjects() {
        this.projectService.getAllMineNotAcceptedProjectRoles().subscribe({
            next: (n) => {
                this.containError = false
                this.notAcceptedProjects = n
            },
            error: (e) => {
                this.returnPrincipalError(e)
            }
        })
    }

    newProject() {
        let newProject: NewProject = new NewProject(this.formNewProject.value.name, this.formNewProject.value.description)
        this.projectService.createProject(newProject).subscribe({
            next: (n) => {
                this.newProjectContainError = false
                this.closebuttonNew.nativeElement.click();
                this.formNewProject.reset()
                this.loadMyProjects()           // refresh my projects from API
            },
            error: (e) => {
                this.newProjectContainError = true
                this.newProjectMessageError = e.error.text
            }
        })
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
        this.projectService.updateProject(project).subscribe({
            next: (n) => {
                this.updateProjectContainError = false
                this.closebuttonUpdate.nativeElement.click();
                this.formNewProject.reset()
                this.loadMyProjects()           // refresh my projects from API
            },
            error: (e) => {
                this.updateProjectContainError = true
                this.updateProjectMessageError = e.error.text
            }
        })
    }

    enableDisableProject(project: Project) {
        if (confirm("Are you sure to disable project " + project.name + '?')) {
            this.projectService.enableDisableProject(project.id).subscribe({
                next: (n) => {
                    this.containError = false
                    this.loadMyProjects()           // refresh my projects from API
                },
                error: (e) => {
                    this.returnPrincipalError(e)
                }
            })
        }
    }

    projectRoleError(err: any, msg: string) {
        let retErr = err.error.text
        if (retErr == undefined) {
            retErr = msg
        }
        this.newProjectRoleContainError = true
        this.newProjectRoleMessageError = retErr
    }

    newProjectRole() {
        let role = Number(this.getKeyByValue(this.rolesDictionary, this.formNewProjectRole.value.role))
        let newProjectRole: CreateProjectRole = new CreateProjectRole(this.myProjects[this.selectedProject].id,
            this.formNewProjectRole.value.username, role)
        this.projectService.createProjectRole(newProjectRole).subscribe({
            next: (n) => {
                this.newProjectRoleContainError = false
                this.formNewProjectRole.reset()
                this.formNewProjectRole.controls['role'].setValue('Member')
                this.loadMyProjects()
                this.closebuttonUsers.nativeElement.click()
            },
            error: (e) => {
                this.projectRoleError(e, "Error adding the user")
            }
        })
    }

    updateProjectRole(role: any, roleTypeEvent: any) {
        let roleTypeStr = roleTypeEvent.value
        let roleType = Number(this.getKeyByValue(this.rolesDictionary, roleTypeStr))
        let updateProjectRole: UpdateProjectRole = new UpdateProjectRole(role.id, roleType)
        this.projectService.updateProjectRole(updateProjectRole).subscribe({
            next: (n) => {
                this.newProjectRoleContainError = false
                this.closebuttonUsers.nativeElement.click()
                this.loadMyProjects()
            },
            error: (e) => {
                this.projectRoleError(e, "Error updating the user")
            }
        })
    }

    roleInvitationError() {
        this.invitationsContainError = false
        this.loadMyProjects()
        this.closebuttonViewInvitations.nativeElement.click()
    }

    roleError(err: any, msg: string) {
        let retErr = err.error.text
        if (retErr == undefined) {
            retErr = msg
        }
        this.invitationsContainError = true
        this.invitationsMessageError = retErr
    }

    acceptRole(id: number) {
        this.projectService.acceptProjectRole(id).subscribe({
            next: (n) => {
                this.roleInvitationError()
            },
            error: (e) => {
                this.roleError(e, "Error accepting invitation")
            }
        })
    }

    declineRole(id: number) {
        this.projectService.declineProjectRole(id).subscribe({
            next: (n) => {
                this.roleInvitationError()
            },
            error: (e) => {
                this.roleError(e, "Error declining invitation")
            }
        })
    }

    public getProfileImageUrlFromRole(role: ProjectRole): any {
        return this.userService.getUrlFromProfile(role.user.imageUid)
    }
}