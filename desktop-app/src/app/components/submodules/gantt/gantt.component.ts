import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { TokenService } from "src/app/services/authentication/token.service";
import { EffortService } from "src/app/services/effort/effort.service";
import { KanbanService } from "src/app/services/kanban/kanban.service";
import { ProjectService } from "src/app/services/projects/project.service";
import { SprintService } from "src/app/services/sprints/sprint.service";
import { ImanSubmodule } from "../submodule.component";

import { gantt } from "dhtmlx-gantt";
import { GanttService } from "src/app/services/gantt/gantt.service";
import { KanbanTask, KanbanTaskUpdate } from "src/app/models/kanban/kanbanTask";

@Component({
    encapsulation: ViewEncapsulation.None,
    selector: 'iMan-gantt',
    templateUrl: './gantt.component.html',
    styleUrls: ['./gantt.component.css']
})
export class GanttComponent extends ImanSubmodule implements AfterViewInit {

    @ViewChild("gantt_here") ganttContainer: any
    @ViewChild('openTaskModal') openTaskModal: any

    selectedTask: any
    selectedKanbanColumnId: number = 0

    constructor(effortService: EffortService, kanbanService: KanbanService, sprintService: SprintService, projectService: ProjectService, formBuilder: FormBuilder, tokenService: TokenService, private ganttService: GanttService) {
        super(effortService, kanbanService, sprintService, projectService, formBuilder, tokenService)
    }

    reloadGantt() {
        gantt.clearAll()
        this.loadData()
    }

    loadAfterTask() {
        this.reloadGantt()
    }

    loadData() {
        let ganttTask = this.ganttService.getGanttTasks(this.myTasks)
        let ganttLinks = this.ganttService.getGanttLinks(this.myTasks)
        gantt.parse({ "data": ganttTask, "links": ganttLinks });
        gantt.refreshData()
    }

    ngAfterViewInit(): void {
        this.loadTasks = true
        this.loadKanban = true
        this.loadMyProjects()
        this.loadGantt()
    }

    loadGantt() {
        gantt.init(this.ganttContainer.nativeElement)
        gantt.config.sort = true
        gantt.config.columns = [
            { name: "text", label: "Task name", width: "*" },
            { name: "start_date", label: "Start", min_width: 80, align: "center" },
            { name: "end_date", label: "Finish", min_width: 80, align: "center" },
            { name: "duration", label: "Days", align: "center" },
            { name: "users", label: "Assignations", min_width: 150, align: "center" },
            // { name: "add", label: "", width: 44 }
        ]

        // OPTIONS
        // this.enableZoom()

        // TASK RESIZE
        gantt.attachEvent("onBeforeTaskUpdate", (id: any, updateTask: any) => {
            let selTask = this.getTaskById(id)
            if (selTask != undefined) {
                let updTask = new KanbanTaskUpdate(selTask.id, selTask.title, selTask.description, selTask.estimatedTime, selTask.tags, selTask.importance,
                    updateTask.start_date, updateTask.end_date, selTask.assignedUsers.map(x => x.username), selTask.children.map(x => x.id))
                this.kanbanService.updateKanbanTask(updTask).subscribe(
                    data => {
                        console.log('Task with id ' + id.toString() + ' have been updated')
                    },
                    err => {
                        this.returnPrincipalError(err)
                    }
                )
            }
        }, '');

        // LINK -> create
        gantt.attachEvent("onAfterLinkAdd", (id, item) => {
            let selTask = this.getTaskById(item.source)
            if (selTask != undefined) {
                let childrens = selTask.children.map(x => x.id)
                childrens.push(item.target)
                let updTask = new KanbanTaskUpdate(selTask.id, selTask.title, selTask.description, selTask.estimatedTime, selTask.tags, selTask.importance,
                    selTask.dueStartDate, selTask.dueEndDate, selTask.assignedUsers.map(x => x.username), childrens)
                this.kanbanService.updateKanbanTask(updTask).subscribe(
                    data => {
                        console.log('Link with source task id ' + item.source.toString() +
                            ' and target task id ' + item.target.toString() + ' created')
                    },
                    err => {
                        this.returnPrincipalError(err)
                    }
                )
            }
        }, '')

        // LINK -> delete
        gantt.attachEvent("onAfterLinkDelete", (id, item) => {
            let selTask = this.getTaskById(item.source)
            if (selTask != undefined) {
                let childrens = selTask.children.map(x => x.id)
                let indexToRemove = childrens.indexOf(item.target)
                childrens.splice(indexToRemove, 1)
                let updTask = new KanbanTaskUpdate(selTask.id, selTask.title, selTask.description, selTask.estimatedTime, selTask.tags, selTask.importance,
                    selTask.dueStartDate, selTask.dueEndDate, selTask.assignedUsers.map(x => x.username), childrens)
                this.kanbanService.updateKanbanTask(updTask).subscribe(
                    data => {
                        console.log('Link with source task id ' + item.source.toString() +
                            ' and target task id ' + item.target.toString() + ' deleted')
                    },
                    err => {
                        this.returnPrincipalError(err)
                    }
                )
            }
        }, '')

        // TASK -> open modal view: task
        gantt.attachEvent("onTaskDblClick", (id, item) => {
            this.selectedTask = this.getTaskById(id)
            this.openTaskModal.nativeElement.click()
        }, '')
    }

    addTask() {
        this.selectedTask = undefined
        if (this.kanban && this.kanban.length != 0) {
            this.selectedKanbanColumnId = this.kanban[0].id
        }
        this.openTaskModal.nativeElement.click()
    }

    getTaskById(id: number): KanbanTask | undefined {
        return this.myTasks.find(x => x.id == id)
    }

    enableZoom() {
        let hourToStr = gantt.date.date_to_str("%H:%i");
        let hourRangeFormat = function (step: any) {
            return function (date: any) {
                let mDate: number = gantt.date.add(date, step, "hour").getTime()
                let intervalEnd = new Date(mDate - 1)
                return hourToStr(date) + " - " + hourToStr(intervalEnd);
            };
        };
        let zoomConfig = {
            levels: [
                [
                    { unit: "month", format: "%M %Y", step: 1 },
                ],
                [
                    { unit: "month", format: "%M %Y", step: 1 },
                    { unit: "day", format: "%d %M", step: 1 }
                ],
                [
                    { unit: "day", format: "%d %M", step: 1 },
                    { unit: "hour", format: hourRangeFormat(12), step: 12 }
                ],
                [
                    { unit: "day", format: "%d %M", step: 1 },
                    { unit: "hour", format: hourRangeFormat(6), step: 6 }
                ],
                [
                    { unit: "day", format: "%d %M", step: 1 },
                    { unit: "hour", format: "%H:%i", step: 1 }
                ]
            ]
        }
        gantt.ext.zoom.init(zoomConfig);
    }


}