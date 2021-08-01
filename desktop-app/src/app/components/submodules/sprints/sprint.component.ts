import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Project } from "src/app/models/project/project";
import { ProjectRole } from "src/app/models/project/roles";
import { SprintCreate, SprintShow, SprintUpdate } from "src/app/models/sprint/sprint";
import { TokenService } from "src/app/services/authentication/token.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";

@Component({
    selector: 'iMan-sprint',
    templateUrl: './sprint.component.html',
    styleUrls: ['./sprint.component.css']
})
export class SprintComponent implements OnInit {


    @ViewChild('closebuttonCreate') closebuttonCreate: any;
    @ViewChild('closebuttonUpdate') closebuttonUpdate: any;

    myProjects: any
    accessToEdit: boolean = false
    mySprints: any
    projectSelectedId: number | undefined
    actualDate: any

    containError: boolean = false
    messageError: string | undefined

    formNewSprint: FormGroup
    newSprintContainError: boolean = false
    newSprintMessageError: string | undefined

    formUpdateSprint: FormGroup
    updateSprintContainError: boolean = false
    updateSprintMessageError: string | undefined
    sprintSelectedId: any

    constructor(private sprintService: SprintService, private projectService: ProjectService, private formBuilder: FormBuilder, private tokenService: TokenService) {
        this.formNewSprint = formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []],
            startDate: ['', []],
            estimatedDate: ['', []],
        })

        this.formUpdateSprint = formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', []],
            startDate: ['', []],
            estimatedDate: ['', []]
        })
    }

    ngOnInit(): void {
        this.loadMyProjects()
        this.loadActualDate()
    }

    loadMyProjects(): any {
        this.projectService.myProjects().subscribe(
            data => {
                this.myProjects = data
                this.loadFirstProject()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    loadActualDate() {
        let dtToday = new Date()

        let month: string = String(dtToday.getMonth() + 1)
        let day: string = String(dtToday.getDate())
        let year: string = String(dtToday.getFullYear())

        if (Number(month) < 10)
            month = '0' + month.toString();
        if (Number(day) < 10)
            day = '0' + day.toString();

        this.actualDate = year + '-' + month + '-' + day;
    }

    returnPrincipalError(err: any) {
        var r = err.error.text
        if (r == undefined) {
            r = 'Error produced'
        }
        this.messageError = r;
        this.containError = true
    }

    loadFirstProject() {
        if (this.myProjects.length !== 0) {
            this.projectSelectedId = this.myProjects[0].id
            this.loadSprintsByProjectId(this.myProjects[0].id)
        }
    }

    loadSprintsByProjectIdEvent(projectIdEvent: any) {
        let projectIdStr = projectIdEvent.value
        this.projectSelectedId = Number(projectIdStr)
        this.loadSprintsByProjectId(this.projectSelectedId)
    }

    editIsAllowed(projectId: number) {
        this.accessToEdit = false

        let projects: Project[] = this.myProjects
        let selectedProject = projects.find(
            (a) => a.id === projectId
        )
        if (selectedProject != undefined) {

            let projectRoles: any = selectedProject.projectRoles

            this.accessToEdit = projectRoles.some(
                (a: ProjectRole) => a.user.username == this.tokenService.getUsername() && [0, 1].includes(a.role)
            )
        }
    }

    reloadSprintsByProject() {
        if (this.projectSelectedId != undefined) {
            this.loadSprintsByProjectId(this.projectSelectedId)
        }
    }

    loadSprintsByProjectId(projectId: number) {
        this.editIsAllowed(projectId)

        this.sprintService.sprintFromProject(projectId).subscribe(
            data => {
                this.mySprints = data
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    determineSprintTimeStatus(sprint: SprintShow): string {
        let isfuture = (new Date(sprint.startDate)) > (new Date())
        if (sprint.startDate == null || isfuture) {
            return 'future'
        } else if (sprint.closeDate != null) {
            return 'past'
        } else {
            return 'present'
        }
    }

    fillUpdateForm(sprint: SprintShow) {
        this.sprintSelectedId = sprint.id
        this.formUpdateSprint = this.formBuilder.group({
            title: [sprint.title, [Validators.required]],
            description: [sprint.description, []],
            startDate: [sprint.startDate, []],
            estimatedDate: [sprint.estimatedDate, []]
        })
    }

    createSprint() {
        if (this.projectSelectedId != undefined) {

            let newSprint: SprintCreate = new SprintCreate(this.formNewSprint.value.title, this.formNewSprint.value.description, this.formNewSprint.value.startDate, this.formNewSprint.value.estimatedDate, this.projectSelectedId)

            this.sprintService.createSprint(newSprint).subscribe(
                res => {
                    this.closebuttonCreate.nativeElement.click()
                    this.reloadSprintsByProject()
                    this.newSprintContainError = false
                },
                err => {
                    this.returnNewError(err)
                }
            )
        } else {
            this.newSprintContainError = true
            this.newSprintMessageError = 'No project selected to create an Sprint'
        }
    }

    returnNewError(err: any) {
        var r = err.error.text
        if (r == undefined) {
            r = "Error adding the user"
        }
        this.newSprintContainError = true
        this.newSprintMessageError = r
    }

    updateSprint() {
        let updateSprint: SprintUpdate = new SprintUpdate(this.sprintSelectedId, this.formUpdateSprint.value.title, this.formUpdateSprint.value.description, this.formUpdateSprint.value.startDate, this.formUpdateSprint.value.estimatedDate)

        this.sprintService.updateSprint(updateSprint).subscribe(
            res => {
                this.closebuttonUpdate.nativeElement.click()
                this.reloadSprintsByProject()
                this.updateSprintContainError = false
            },
            err => {
                var r = err.error.text
                if (r == undefined) {
                    r = "Error adding the user"
                }
                this.updateSprintContainError = true
                this.updateSprintMessageError = r
            }
        )
    }

    disableSprint(sprintId: number) {
        this.sprintService.disableSprint(sprintId).subscribe(
            res => {
                this.reloadSprintsByProject()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    startSprint(sprintId: number) {
        this.sprintService.startSprint(sprintId).subscribe(
            res => {
                this.reloadSprintsByProject()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    closeSprint(sprintId: number) {
        this.sprintService.closeSprint(sprintId).subscribe(
            res => {
                this.reloadSprintsByProject()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
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