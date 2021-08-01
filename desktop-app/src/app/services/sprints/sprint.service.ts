import { HttpClient } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { Observable } from "rxjs"
import { SprintCreate, SprintShow, SprintUpdate } from "src/app/models/sprint/sprint"
import { environment } from "src/environments/environment"

@Injectable({
    providedIn: 'root'
})
export class SprintService {
    // URL
    hostUrl = environment.backendEndpoint + '/sprint/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS
    * 
    */
    public createSprint(sprint: SprintCreate): Observable<any> {
        var url = this.hostUrl
        return this.httpClient.post<SprintCreate>(url, sprint)
    }

    public updateSprint(sprint: SprintUpdate): Observable<any> {
        var url = this.hostUrl
        return this.httpClient.put<SprintUpdate>(url, sprint)
    }

    public deleteSprint(sprintId: number): Observable<any> {
        var url = this.hostUrl + sprintId
        return this.httpClient.delete<any>(url)
    }

    public closeSprint(sprintId: number): Observable<any> {
        var url = this.hostUrl + sprintId + '/close'
        return this.httpClient.put<any>(url,undefined)
    }

    public disableSprint(sprintId: number): Observable<any> {
        var url = this.hostUrl + sprintId + '/disable'
        return this.httpClient.put<any>(url,undefined)
    }

    public startSprint(sprintId: number): Observable<any> {
        var url = this.hostUrl + sprintId + '/start'
        return this.httpClient.put<any>(url,undefined)
    }

    public sprintFromProject(projectId: number): Observable<any> {
        var url = this.hostUrl + 'project/' + projectId
        return this.httpClient.get<SprintShow>(url)
    }



}