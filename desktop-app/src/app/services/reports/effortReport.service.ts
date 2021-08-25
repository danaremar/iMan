import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EffortReport } from "src/app/models/reports/effortReports";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class EffortReportService {

    // URL
    hostUrl = environment.backendEndpoint + '/reports/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS
    * 
    */

    public getEffortReportBySprintId(sprintId: number): Observable<any> {
        var url = this.hostUrl + 'effort/' + sprintId
        return this.httpClient.get<EffortReport>(url)
    }

}