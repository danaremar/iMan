import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { NewProject, Project, UpdateProject } from "src/app/models/project/project";
import { CreateProjectRole, UpdateProjectRole } from "src/app/models/project/roles";

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

    public myProjects(): Observable<any> {
        var url = this.hostUrl + '/project/my-projects';
        return this.httpClient.get<Project[]>(url);
    }

    public createProject(project: NewProject): Observable<any> {
        var url = this.hostUrl + '/project';
        return this.httpClient.post<Project>(url, project);
    }

    public updateProject(project: UpdateProject): Observable<any> {
        var url = this.hostUrl + '/project';
        return this.httpClient.put<Project>(url, project);
    }

    public enableDisableProject(projectId: number): Observable<any> {
        var url = this.hostUrl + '/project/enable-disable/' + projectId;
        return this.httpClient.put<Project>(url, undefined);
    }

    public createProjectRole(projectRole: CreateProjectRole): Observable<any> {
        var url = this.hostUrl + '/project/role';
        return this.httpClient.post<CreateProjectRole>(url, projectRole)
    }

    public updateProjectRole(projectRole: UpdateProjectRole): Observable<any> {
        var url = this.hostUrl + '/project/role';
        return this.httpClient.put<UpdateProjectRole>(url, projectRole)
    }

    public acceptProjectRole(projectRoleId: number): Observable<any> {
        var url = this.hostUrl + '/project/role/' + projectRoleId + '/accept';
        return this.httpClient.put<UpdateProjectRole>(url, undefined)
    }

    public declineProjectRole(projectRoleId: number): Observable<any> {
        var url = this.hostUrl + '/project/role/' + projectRoleId + '/decline';
        return this.httpClient.delete<UpdateProjectRole>(url)
    }

    public getAllRoles() {
        return {
            //"0": "Owner",
            "1": "Admin",
            "2": "Member",
            "3": "Visitor"
        }
    }

}