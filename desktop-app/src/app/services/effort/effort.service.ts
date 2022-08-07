import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Effort, EffortStart, EffortUpdate } from "src/app/models/effort/effort";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EffortService {

    // URL
    hostUrl = environment.backendEndpoint + '/effort/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS
    * 
    */

    // GET
    public getAllMyEfforts(): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.get<Effort>(url)
    }
    public getAllEffortsByTaskId(taskId: number): Observable<any> {
        let url = this.hostUrl + 'task/' + taskId
        return this.httpClient.get<Effort>(url)
    }
    public getActiveEffort(): Observable<any> {
        let url = this.hostUrl + 'active/'
        return this.httpClient.get<Effort>(url)
    }

    // START
    public startEffort(effortStart: EffortStart): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.post<EffortStart>(url, effortStart)
    }

    // END
    public endEffort(effortId: number): Observable<any> {
        let url = this.hostUrl + effortId + '/end'
        return this.httpClient.put<any>(url, undefined)
    }

    // UPDATE
    public updateEffort(effortUpdate: EffortUpdate): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.put<EffortUpdate>(url, effortUpdate)
    }

    // DELETE
    public deleteEffort(effortId: number): Observable<any> {
        let url = this.hostUrl + effortId
        return this.httpClient.delete<any>(url)
    }

}