import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IncidentCreateDto, IncidentShowDto, IncidentUpdateCreateDto, IncidentUpdateDto } from "src/app/models/incidents/incidents";
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

    // FIND INCIDENT (TO LIST)
    public findIncidentsByProject(projectId: number, pageNumber: number, pageSize: number): Observable<any> {
        var url = this.hostUrl + 'project/' + projectId
        const params = new HttpParams()
            .set("page", (pageNumber-1).toString())
            .set("size", pageSize.toString())
        return this.httpClient.get<any>(url, {params})
    }

    public findIncidentsByProjectParams(projectId: number, params: any): Observable<any> {
        var url = this.hostUrl + 'project/' + projectId
        return this.httpClient.get<any>(url, {params})
    }

    // GET INCIDENT FROM ID
    public getIncidentById(incidentId: number): Observable<any> {
        var url = this.hostUrl + incidentId
        return this.httpClient.get<IncidentShowDto>(url)
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