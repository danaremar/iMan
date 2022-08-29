import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { VulnLibCreateDto, VulnLibShowDto, VulnLibUpdateDto } from "src/app/models/vulns/vulnlib";
import { environment } from "src/environments/environment";
import { AgGridApi } from "../ag-grid-api/ag-grid-api";

@Injectable({
    providedIn: 'root'
})
export class VulnLibService {
    
    // URL
    hostUrl = environment.backendEndpoint + '/security/vulnlib/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS VULNS
    * 
    */
   
    // FIND STANDARD
    public findStandardVulnLibs(pageNumber: number, pageSize: number, order: Array<any>, filter: any, incCol: any): Observable<any> {
        let url = this.hostUrl
        let params = AgGridApi.getAgGridParams(pageNumber, pageSize, order, filter, incCol)
        return this.httpClient.get<any>(url, { params })
    }

    // FIND STANDARD + PROJECT
    public findVulnLibsByProject(projectId: number, pageNumber: number, pageSize: number, order: Array<any>, filter: any, incCol: any): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        let params = AgGridApi.getAgGridParams(pageNumber, pageSize, order, filter, incCol)
        return this.httpClient.get<any>(url, { params })
    }

    // GET FROM ID
    public getVulnLibById(vulnLibId: number): Observable<any> {
        let url = this.hostUrl + vulnLibId
        return this.httpClient.get<VulnLibShowDto>(url)
    }


    // CREATE
    public createVulnLib(projectId:number, vulnLibCreateDto: VulnLibCreateDto): Observable<any> {
        let url = this.hostUrl + 'project/' + projectId
        return this.httpClient.post<VulnLibCreateDto>(url, vulnLibCreateDto)
    }


    // UPDATE
    public updateVulnLib(vulnLibUpdateDto: VulnLibUpdateDto): Observable<any> {
        let url = this.hostUrl
        return this.httpClient.put<VulnLibUpdateDto>(url, vulnLibUpdateDto)
    }

    // DISABLE
    public disableVulnLib(vulnLibId: number): Observable<any> {
        let url = this.hostUrl + vulnLibId
        return this.httpClient.delete<any>(url)
    }

}