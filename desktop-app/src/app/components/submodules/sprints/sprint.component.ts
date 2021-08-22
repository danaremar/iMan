import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SprintCreate, SprintShow, SprintUpdate } from "src/app/models/sprint/sprint";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { EffortReportService } from "src/app/services/reports/effortReport.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { ImanSubmodule } from "../submodule.component";

@Component({
    selector: 'iMan-sprint',
    templateUrl: './sprint.component.html',
    styleUrls: ['./sprint.component.css']
})
export class SprintComponent extends ImanSubmodule implements OnInit {

    @ViewChild('closebuttonCreate') closebuttonCreate: any;
    @ViewChild('closebuttonUpdate') closebuttonUpdate: any;

    myProjects: any
    mySprints: any
    projectSelectedId: number | null | undefined
    accessToEdit: boolean = false
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

    effortReport: any
    sprintSelected: any
    pieChartEffortsByTask = [] as any
    pieChartEffortsByUser = [] as any

    constructor(private effortReportService: EffortReportService, effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService) {
        
        super(effortService,kanbanService,sprintService,projectService,formBuilder,tokenService)

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

    loadSprintsBySelectedProject() {
        let projectId = this.projectService.getStoredProjectId()
        if (projectId != null && projectId != 0) {
            this.editIsAllowed(projectId)
            this.sprintService.sprintFromProject(projectId).subscribe(
                data => {
                    this.containError = false
                    this.mySprints = data
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
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
        let projectId = this.projectService.getStoredProjectId()
        if (projectId != null && projectId != 0) {
            let newSprint: SprintCreate = new SprintCreate(this.formNewSprint.value.title, this.formNewSprint.value.description, this.formNewSprint.value.startDate, this.formNewSprint.value.estimatedDate, projectId)
            this.sprintService.createSprint(newSprint).subscribe(
                res => {
                    this.formNewSprint.reset()
                    this.closebuttonCreate.nativeElement.click()
                    this.loadSprintsBySelectedProject()
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
                this.formNewSprint.reset()
                this.closebuttonUpdate.nativeElement.click()
                this.loadSprintsBySelectedProject()
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

    disableSprint(sprint: SprintShow, number: number) {
        if (confirm("Are you sure to disable sprint #" + number + " " + sprint.title + "?")) {
            this.sprintService.disableSprint(sprint.id).subscribe(
                res => {
                    this.containError = false
                    this.loadSprintsBySelectedProject()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }

    startSprint(sprint: SprintShow) {
        if (confirm("Are you sure to start sprint " + sprint.title + '?')) {
            this.sprintService.startSprint(sprint.id).subscribe(
                res => {
                    this.containError = false
                    this.loadSprintsBySelectedProject()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }

    closeSprint(sprint: SprintShow) {
        if (confirm("Are you sure to close sprint " + sprint.title + '?')) {
            this.sprintService.closeSprint(sprint.id).subscribe(
                res => {
                    this.containError = false
                    this.loadSprintsBySelectedProject()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }


    loadEffortReport(sprint: SprintShow, number: number) {
        this.sprintSelected = sprint
        this.sprintSelected.number = number
        this.effortReportService.getEffortReportBySprintId(sprint.id).subscribe(
            data => {
                this.effortReport = data
                this.containError = false
                this.loadPieChartEffortsByTask()
                this.loadPieChartEffortsByUser()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    timeToDoubleString(number: number): string {
        if (number == null) number = 0
        return (number % 1 ? number.toFixed(3) : number) + ''
    }

    loadPieChartEffortsByTask() {
        this.pieChartEffortsByTask=[]
        for (let e of this.effortReport.effortsByTask) {
            this.pieChartEffortsByTask.push({
                name: '#' + e.kanbanTask.number + ': ' + e.kanbanTask.title,
                value: e.percentageEffort
            })
        }
    }

    loadPieChartEffortsByUser() {
        this.pieChartEffortsByUser=[]
        for (let e of this.effortReport.effortsByUser) {
            this.pieChartEffortsByUser.push({
                name: '@' + e.user.username,
                value: e.percentageEffort
            })
        }
    }
    
}