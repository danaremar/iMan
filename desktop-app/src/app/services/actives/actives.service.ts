import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ActiveCreateDto, ActiveShowDto, ActiveUpdateDto } from "src/app/models/actives/actives";
import { environment } from "src/environments/environment";
import { AgGridApi } from "../ag-grid-api/ag-grid-api";

@Injectable({
    providedIn: 'root'
})
export class ActiveService {

    // URL
    hostUrl = environment.backendEndpoint + '/security/actives/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS Actives
    * 
    */

    // FIND
    public findActivesByProject(projectId: number, pageNumber: number, pageSize: number, order: Array<any>, filter: any, incCol: any): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        let params = AgGridApi.getAgGridParams(pageNumber, pageSize, order, filter, incCol)
        return this.httpClient.get<any>(url, { params })
    }

    // GET FROM ID
    public getActiveById(activeId: number): Observable<any> {
        let url = this.hostUrl + activeId
        return this.httpClient.get<ActiveShowDto>(url)
    }


    // CREATE
    public createActive(activeCreateDto: ActiveCreateDto): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.post<ActiveCreateDto>(url, activeCreateDto)
    }


    // UPDATE
    public updateActive(activeUpdateDto: ActiveUpdateDto): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.put<ActiveUpdateDto>(url, activeUpdateDto)
    }

    // DISABLE
    public disableActive(activeId: number): Observable<any> {
        let url = this.hostUrl + activeId
        return this.httpClient.delete<any>(url)
    }

}