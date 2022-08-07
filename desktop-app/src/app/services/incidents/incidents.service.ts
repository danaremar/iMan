import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { IncidentCreateDto, IncidentShowDto, IncidentUpdateCreateDto, IncidentUpdateDto, IncidentUpdateShowDto } from "src/app/models/incidents/incidents";
import { environment } from "src/environments/environment";
import { AgGridApi } from "../ag-grid-api/ag-grid-api";

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
        let url = this.hostUrl + 'project/' + projectId
        let params = AgGridApi.getAgGridParams(pageNumber, pageSize, order, filter, incCol)
        return this.httpClient.get<any>(url, { params })
    }

    // GET INCIDENT FROM ID
    public getIncidentById(incidentId: number): Observable<any> {
        let url = this.hostUrl + incidentId
        return this.httpClient.get<IncidentShowDto>(url)
    }

    // GET INCIDENT UPDATED FROM INCIDENT ID
    public getIncidentUpdatesByIncidentId(incidentId: number): Observable<any> {
        let url = this.hostUrl + incidentId + '/updates'
        return this.httpClient.get<Array<IncidentUpdateShowDto>>(url)
    }

    // CREATE
    public createIncident(incidentCreateDto: IncidentCreateDto): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.post<IncidentCreateDto>(url, incidentCreateDto)
    }

    // UPDATE
    public updateIncident(incidentUpdateDto: IncidentUpdateDto): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.put<IncidentUpdateDto>(url, incidentUpdateDto)
    }

    // DISABLE
    public disableIncident(incidentId: number): Observable<any> {
        let url = this.hostUrl + incidentId
        return this.httpClient.delete<any>(url)
    }

    /*
    *
    * OPERATIONS INCIDENT UPDATE
    * 
    */

    // CREATE
    public createIncidentUpdate(incidentId: number, incidentUpdateCreateDto: IncidentUpdateCreateDto): Observable<any> {
        let url = this.hostUrl + incidentId + '/update'
        return this.httpClient.post<IncidentUpdateCreateDto>(url, incidentUpdateCreateDto);
    }

}