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

    // GET LOCAL
    public getImage(): string | null {
        return localStorage.getItem(PROFILE_IMAGE_KEY)
    }
    public getMyImageUrl(): string | null {
        return this.getImageUrl(this.getImage())
    }

    public getImageUrl(imageUid: string | null): string | null {
        if (imageUid && imageUid != '') {
            return environment.backendEndpoint + '/images/' + imageUid
        } else {
            return null
        }
    }

    // SET LOCAL
    public setImage(image: string): void {
        localStorage.removeItem(PROFILE_IMAGE_KEY)
        localStorage.setItem(PROFILE_IMAGE_KEY, image)
    }

    // RELOAD LOCAL
    public reloadProfileImage(): void {
        var profileImageUid: string | null = null
        this.getMyProfile().subscribe(
            data => {
                profileImageUid = data.imageUid
                this.setImage(profileImageUid ? profileImageUid : '')
            },
            res => {
                this.setImage('')
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