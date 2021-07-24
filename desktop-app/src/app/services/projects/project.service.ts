import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { NewUser } from "src/app/models/user/new-user";
import { LoginUser } from "src/app/models/user/login-user";
import { Project } from "src/app/models/project/project";

@Injectable({
    providedIn: 'root'
})
export class ProjectService {

    // URL
    hostUrl = environment.backendEndpoint

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS
    * 
    */
    public myProjects(): Observable<any>{
        var url= this.hostUrl + '/project/my-projects';
        return this.httpClient.get<Project[]>(url);
    }



}