import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RiskFreqCreateDto, RiskFreqShowDto, RiskFreqUpdateDto } from "src/app/models/risks/risk_freq";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class RiskFreqService {
    
    // URL
    hostUrl = environment.backendEndpoint + '/security/risks/freq/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS RISK FREQUENCIES
    * 
    */

    // GET BT PROJECT ID
    public getRiskFreqByProjectId(projectId: number): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        return this.httpClient.get<RiskFreqShowDto>(url)
    }

    // CREATE
    public createRiskFreq(projectId: number, riskFreqCreateDto: RiskFreqCreateDto): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        return this.httpClient.post<RiskFreqCreateDto>(url, riskFreqCreateDto)
    }

    // UPDATE
    public updateRiskFreq(riskFreqUpdateDto: RiskFreqUpdateDto): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.put<RiskFreqUpdateDto>(url, riskFreqUpdateDto)
    }

    // DELETE
    public deleteRiskFreq(riskId: number): Observable<any> {
        let url = this.hostUrl + riskId
        return this.httpClient.delete<any>(url)
    }
}