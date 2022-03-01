import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Link } from "src/app/models/gantt/gantt-link";

@Injectable()
export class LinkService {
    private linkUrl = "api/links";

    constructor(private http: HttpClient) {}

    get(): any {
        return this.http.get(this.linkUrl)
            .toPromise()
            .catch(HandleError);
    }

    insert(link: Link): any {
        return this.http.post(this.linkUrl, link)
            .toPromise()
            .catch(HandleError);
    }

    update(link: Link): any {
        return this.http.put('${this.linkUrl}/${link.id}', link)
            .toPromise()
            .catch(HandleError);
    }

    remove(id: number): any {
        return this.http.delete('${this.linkUrl}/${id}')
            .toPromise()
            .catch(HandleError);
    }
}

function HandleError(HandleError: any): Promise<Link[]> {
    console.log("HEHEHE");
    
    throw new Error("HEHEHE");
}
