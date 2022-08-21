import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VulnCreateDto, VulnShowDto, VulnUpdateDto } from "src/app/models/vulns/vuln";
import { environment } from "src/environments/environment";
import { AgGridApi } from "../ag-grid-api/ag-grid-api";

@Injectable({
    providedIn: 'root'
})
export class VulnService {
    
    // URL
    hostUrl = environment.backendEndpoint + '/security/vuln/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS VULNS
    * 
    */

    // FIND
    public findVulnsByProject(projectId: number, pageNumber: number, pageSize: number, order: Array<any>, filter: any, incCol: any): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        let params = AgGridApi.getAgGridParams(pageNumber, pageSize, order, filter, incCol)
        return this.httpClient.get<any>(url, { params })
    }

    // GET FROM ID
    public getVulnById(vulnId: number): Observable<any> {
        let url = this.hostUrl + vulnId
        return this.httpClient.get<VulnShowDto>(url)
    }


    // CREATE
    public createVuln(projectId:number, vulnCreateDto: VulnCreateDto): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        return this.httpClient.post<VulnCreateDto>(url, vulnCreateDto)
    }


    // UPDATE
    public updateVuln(vulnUpdateDto: VulnUpdateDto): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.put<VulnUpdateDto>(url, vulnUpdateDto)
    }

    // DISABLE
    public disableVuln(vulnId: number): Observable<any> {
        let url = this.hostUrl + vulnId
        return this.httpClient.delete<any>(url)
    }

}