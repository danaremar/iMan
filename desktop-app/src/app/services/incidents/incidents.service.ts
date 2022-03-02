import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IncidentCreateDto, IncidentShowDto, IncidentUpdateCreateDto, IncidentUpdateDto, IncidentUpdateShowDto } from "src/app/models/incidents/incidents";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class IncidentService {

    // URL
    hostUrl = environment.backendEndpoint + '/incident/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS INCIDENT
    * 
    */

    // FIND
    public findIncidentsByProject(projectId: number, pageNumber: number, pageSize: number, order: Array<any>, filter: any, incCol: any): Observable<any> {
        var url = this.hostUrl + 'project/' + projectId
        let params = new HttpParams()
            .set("page", (pageNumber - 1).toString())
            .set("size", pageSize.toString())

        for (let i = 0; i < order.length; i++) {
            var a = order[i]
            params = params.append("sort", a.colId + ',' + a.sort)
        }

        if (filter) {
            var b = this.getAllColumns(incCol)
            for (let column of b) {
                var searchFilter = filter[column]
                if (searchFilter) {
                    params = params.append(column, searchFilter.filter)
                }
            }
        }

        return this.httpClient.get<any>(url, { params })
    }

    public getAllColumns(incCol: any): Array<string> {
        return incCol.map((x: { field: any; }) => x.field)
    }

    // GET INCIDENT FROM ID
    public getIncidentById(incidentId: number): Observable<any> {
        var url = this.hostUrl + incidentId
        return this.httpClient.get<IncidentShowDto>(url)
    }

    // GET INCIDENT UPDATED FROM INCIDENT ID
    public getIncidentUpdatesByIncidentId(incidentId: number): Observable<any> {
        var url = this.hostUrl + incidentId + '/updates'
        return this.httpClient.get<Array<IncidentUpdateShowDto>>(url)
    }

    // CREATE
    public createIncident(incidentCreateDto: IncidentCreateDto): Observable<any> {
        var url = this.hostUrl
        return this.httpClient.post<IncidentCreateDto>(url, incidentCreateDto)
    }

    // UPDATE
    public updateIncident(incidentUpdateDto: IncidentUpdateDto): Observable<any> {
        var url = this.hostUrl
        return this.httpClient.put<IncidentUpdateDto>(url, incidentUpdateDto)
    }

    // DISABLE
    public disableIncident(incidentId: number): Observable<any> {
        var url = this.hostUrl + incidentId
        return this.httpClient.delete<any>(url)
    }

    /*
    *
    * OPERATIONS INCIDENT UPDATE
    * 
    */

    // CREATE
    public createIncidentUpdate(incidentId: number, incidentUpdateCreateDto: IncidentUpdateCreateDto): Observable<any> {
        var url = this.hostUrl + incidentId + '/update'
        return this.httpClient.post<IncidentUpdateCreateDto>(url, incidentUpdateCreateDto);
    }

}