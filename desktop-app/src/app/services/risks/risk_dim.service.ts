import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RiskDimCreateDto, RiskDimShowDto, RiskDimUpdateDto } from "src/app/models/risks/risk_dim";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RiskDimService {
    
    // URL
    hostUrl = environment.backendEndpoint + '/security/risks/dimension/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS RISK DIMENSIONS
    * 
    */

    // GET BT PROJECT ID
    public getRiskDimByProjectId(projectId: number): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        return this.httpClient.get<RiskDimShowDto>(url)
    }

    // CREATE
    public createRiskDim(projectId: number, riskDimCreateDto: RiskDimCreateDto): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        return this.httpClient.post<RiskDimCreateDto>(url, riskDimCreateDto)
    }

    // UPDATE
    public updateRiskDim(riskDimUpdateDto: RiskDimUpdateDto): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.put<RiskDimUpdateDto>(url, riskDimUpdateDto)
    }

    // UPDATE ALL
    public updateAllRiskDim(projectId: number, riskDimUpdateDtoLs: Array<RiskDimUpdateDto>): Observable<any> {
        let url = this.hostUrl + 'all/project/' + projectId
        return this.httpClient.put<RiskDimUpdateDto>(url, riskDimUpdateDtoLs)
    }

    // DELETE
    public deleteRiskDim(riskId: number): Observable<any> {
        let url = this.hostUrl + riskId
        return this.httpClient.delete<any>(url)
    }
}