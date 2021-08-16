import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { KanbanColumnCreate, KanbanColumnShow, KanbanColumnUpdate } from "src/app/models/kanban/kanbanColumn";
import { KanbanTask, KanbanTaskCreate, KanbanTaskMove, KanbanTaskUpdate } from "src/app/models/kanban/kanbanTask";
import { environment } from "src/environments/environment";

const KANBAN_TASK_ID = 'KanbanTaskId'

@Injectable({
    providedIn: 'root'
})
export class KanbanService {

    // URL
    hostUrl = environment.backendEndpoint + '/kanban/'
    kanbanColumnUrl = this.hostUrl + 'column/'
    kanbanTaskUrl = this.hostUrl + 'task/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS
    * 
    */

    // GET ALL
    public getAllKanbanBySprintId(sprintId: number): Observable<any> {
        var url = this.hostUrl + 'sprint/' + sprintId
        return this.httpClient.get<KanbanColumnShow>(url)
    }


    // COLUMNS
    public createKanbanColumn(kanbanColumn: KanbanColumnCreate): Observable<any> {
        var url = this.kanbanColumnUrl
        return this.httpClient.post<KanbanColumnCreate>(url, kanbanColumn)
    }
    public updateKanbanColumn(kanbanColumn: KanbanColumnUpdate): Observable<any> {
        var url = this.kanbanColumnUrl
        return this.httpClient.put<KanbanColumnUpdate>(url, kanbanColumn)
    }
    public disableKanbanColumn(columnId: number) {
        var url = this.kanbanColumnUrl + columnId + '/disable'
        return this.httpClient.put<any>(url, undefined)
    }


    // TASKS
    public getAllKanbanTasksBySprintId(sprintId: number): Observable<any> {
        var url = this.hostUrl + 'task/sprint/' + sprintId
        return this.httpClient.get<KanbanTask>(url)
    }
    public createKanbanTask(kanbanTask: KanbanTaskCreate): Observable<any> {
        var url = this.kanbanTaskUrl
        return this.httpClient.post<KanbanTaskCreate>(url, kanbanTask)
    }
    public updateKanbanTask(kanbanTask: KanbanTaskUpdate): Observable<any> {
        var url = this.kanbanTaskUrl
        return this.httpClient.put<KanbanTaskUpdate>(url, kanbanTask)
    }
    public disableKanbanTask(kanbanTaskId: number): Observable<any> {
        var url = this.kanbanTaskUrl + kanbanTaskId + '/disable'
        return this.httpClient.put<any>(url, undefined)
    }
    public moveKanbanTask(kanbanTask: KanbanTaskMove): Observable<any> {
        var url = this.kanbanTaskUrl + 'move'
        return this.httpClient.put<KanbanTaskMove>(url, kanbanTask)
    }

    // SAVE
    public getStoredKanbanTaskId(): number | null {
        return Number(localStorage.getItem(KANBAN_TASK_ID))
    }

    public setStoredKanbanTaskId(sprintId: number): void {
        localStorage.setItem(KANBAN_TASK_ID, String(sprintId))
    }

}