import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { MyUser } from "src/app/models/user/my-user";
import { UserUpdate } from "src/app/models/user/update-user";
import { environment } from "src/environments/environment";

const PROFILE_IMAGE_KEY = 'UserProfileImage'

@Injectable({
    providedIn: 'root'
})
export class UserService {

    // URL
    hostUrl = environment.backendEndpoint + '/profile/'

    // Profile image Url
    imageUrl: string | null | undefined

    // CONSTRUCTOR
    constructor(private httpClient: HttpClient) { }

    /*
    *
    * OPERATIONS
    * 
    */

    // GET
    public getMyProfile(): Observable<any> {
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

    /*
    *
    * PROFILE IMAGE OPERATIONS
    * 
    */

    // SET LOCAL
    public setImage(image: string | null): void {
        if(image==null || image==''){
            this.imageUrl = null
        } else {
            this.imageUrl = environment.backendEndpoint + '/images/' + image
        }
    }

    // RELOAD
    public reloadProfileImage(): void {
        this.getMyProfile().subscribe(
            data => {
                var profileImageUid = data.imageUid
                this.setImage(profileImageUid ? profileImageUid : null)
            },
            res => {
                this.setImage(null)
            }
        )

    }

    // UPLOAD REMOTE
    public uploadUserImageProfile(profileImage: File): Observable<any> {
        var url = this.hostUrl + 'image'
        const formData: FormData = new FormData()
        formData.append('image', profileImage)
        return this.httpClient.post<any>(url, formData)
    }

    // DELETE REMOTE
    public deleteUserImageProfile(): Observable<any> {
        var url = this.hostUrl + 'image'
        return this.httpClient.delete<any>(url)
    }

}