import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Effort, EffortStart, EffortUpdate } from "src/app/models/effort/effort";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { ImanSubmodule } from "../submodule.component";

@Component({
    selector: 'iMan-effort',
    templateUrl: './effort.component.html',
    styleUrls: ['./effort.component.css']
})
export class EffortComponent extends ImanSubmodule implements OnInit {

    @ViewChild('closebuttonCreateEffort') closebuttonCreateEffort: any;
    @ViewChild('closebuttonUpdateEffort') closebuttonUpdateEffort: any;



    /***************************
            GENERAL
    ***************************/

    effortSelected: Effort | undefined
    changedToDescription: boolean = false



    /***************************
            EFFORT
    ***************************/

    // NEW
    formNewEffort: FormGroup

    // UPDATE
    formUpdateEffort: FormGroup
    updateEffortContainError: boolean = false
    updateEffortMessageError: string | undefined



    /***************************
            CONSTRUCTOR
    ***************************/

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService) {

        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)

        this.formNewEffort = formBuilder.group({
            description: ['', []],
        })

        this.formUpdateEffort = formBuilder.group({
            description: ['', []],
            startDate: ['', [Validators.required]],
            endDate: ['', []],
        })
    }



    /***************************
        METHODS -> GENERAL
    ***************************/

    ngOnInit(): void {
        this.loadActiveEffort()
        this.loadTasks = true
        this.loadMyProjects()
    }

    loadActualDate() {
        let today = new Date()
        this.actualDate = this.getFormatedDateTimeLikeInput(today)
    }



    /***************************
        METHODS -> EFFORT
    ***************************/

    loadActiveEffort() {
        this.effortService.getActiveEffort().subscribe(
            data => {
                this.containError = false
                this.activeEffort = data
                if (data != null) {
                    if (data.project != null) this.projectService.setStoredProjectId(data.project.id)
                    if (data.sprint != null) this.sprintService.setStoredSprintId(data.sprint.id)
                    if (data.kanbanTask != null) this.kanbanService.setStoredKanbanTaskId(data.kanbanTask.id)
                }
                this.loadDescriptionOrTaskEffort()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    loadDescriptionOrTaskEffort() {
        if (this.activeEffort != null && this.activeEffort.kanbanTask == null && this.activeEffort.description != null && this.activeEffort.description != '') {
            this.changedToDescription = true
            this.formNewEffort = this.formBuilder.group({
                description: [this.activeEffort.description, []],
            })
        }
    }

    startEffort() {
        let newEffort: EffortStart
        let taskId = this.kanbanService.getStoredKanbanTaskId()
        if (this.changedToDescription || taskId == null) {
            newEffort = new EffortStart(this.formNewEffort.value.description, 0)
        } else {
            newEffort = new EffortStart("", taskId)
        }
        this.effortService.startEffort(newEffort).subscribe(
            data => {
                this.containError = false
                this.loadEfforts()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    fillUpdateForm(effort: Effort) {
        this.effortSelected = effort
        this.loadActualDate()

        this.formUpdateEffort = this.formBuilder.group({
            description: [effort.description, []],
            startDate: [this.getFormatedDateTimeLikeInput(effort.startDate), [Validators.required]],
            endDate: [this.getFormatedDateTimeLikeInput(effort.endDate), [Validators.required]],
        })

    }

    updateEffort() {
        if (this.effortSelected != undefined && this.effortSelected != null) {
            let kanbanTaskId: any = this.effortSelected.kanbanTask == null ? 0 : this.effortSelected.kanbanTask.id
            let updateEffort: EffortUpdate = new EffortUpdate(this.effortSelected.id, this.formUpdateEffort.value.description, kanbanTaskId, new Date(this.formUpdateEffort.value.startDate), new Date(this.formUpdateEffort.value.endDate))
            this.effortService.updateEffort(updateEffort).subscribe(
                data => {
                    this.effortSelected = undefined
                    this.formUpdateEffort.reset()
                    this.closebuttonUpdateEffort.nativeElement.click()
                    this.updateEffortContainError = false
                    this.loadEfforts()
                },
                err => {
                    var r = err.error.text
                    if (r == undefined) {
                        r = 'Error produced'
                    }
                    this.updateEffortMessageError = r;
                    this.updateEffortContainError = true
                }
            )
        }

    }

    endEffort() {
        this.effortService.endEffort(this.activeEffort.id).subscribe(
            data => {
                this.containError = false
                this.loadEfforts()
            },
            err => {
                this.returnPrincipalError(err)
            }
        )
    }

    deleteEffort(effortId: number) {
        if (confirm("Are you sure to delete this effort?")) {
            this.effortService.deleteEffort(effortId).subscribe(
                data => {
                    this.containError = false
                    this.loadEfforts()
                },
                err => {
                    this.returnPrincipalError(err)
                }
            )
        }
    }



    /***************************
       METHODS -> OTHERS
    ***************************/

    changeViewDescription() {
        this.changedToDescription = !this.changedToDescription
    }
}