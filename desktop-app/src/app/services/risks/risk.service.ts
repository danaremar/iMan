import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RiskCreateDto, RiskShowDto, RiskUpdateDto } from "src/app/models/risks/risk";
import { environment } from "src/environments/environment";
import { AgGridApi } from "../ag-grid-api/ag-grid-api";

@Injectable({
    providedIn: 'root'
})
export class RiskService {
    
    // URL
    hostUrl = environment.backendEndpoint + '/security/risks/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS RISKS
    * 
    */

    // FIND
    public findRisksByProject(projectId: number, pageNumber: number, pageSize: number, order: Array<any>, filter: any, incCol: any): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        let params = AgGridApi.getAgGridParams(pageNumber, pageSize, order, filter, incCol)
        return this.httpClient.get<any>(url, { params })
    }

    // GET FROM ID
    public getRiskById(RiskId: number): Observable<any> {
        let url = this.hostUrl + RiskId
        return this.httpClient.get<RiskShowDto>(url)
    }


    // CREATE
    public createRisk(projectId:number, riskCreateDto: RiskCreateDto): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        return this.httpClient.post<RiskCreateDto>(url, riskCreateDto)
    }


    // UPDATE
    public updateRisk(riskUpdateDto: RiskUpdateDto): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.put<RiskUpdateDto>(url, riskUpdateDto)
    }

    // DISABLE
    public disableRisk(riskId: number): Observable<any> {
        let url = this.hostUrl + riskId
        return this.httpClient.delete<any>(url)
    }

}