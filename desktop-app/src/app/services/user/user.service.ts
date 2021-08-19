import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MyUser } from "src/app/models/user/my-user";
import { UserUpdate } from "src/app/models/user/update-user";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // URL
    hostUrl = environment.backendEndpoint + '/profile/'

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS
    * 
    */

    // GET
    public getMyProfile(): Observable<any>{
        var url = this.hostUrl
        return this.httpClient.get<MyUser>(url)
    }

    // UPDATE
    public updateProfile(userUpdate: UserUpdate): Observable<any> {
        var url = this.hostUrl
        return this.httpClient.put<UserUpdate>(url, userUpdate)
    }

    // DELETE
    public deleteUserProfile(): Observable<any> {
        var url = this.hostUrl
        return this.httpClient.delete<any>(url)
    }

}