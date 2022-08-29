import { HttpParams } from "@angular/common/http"

export class AgGridApi {
    public static getAgGridParams(pageNumber: number, pageSize: number, order: Array<any>, filter: any, incCol: any): HttpParams {

        let params = new HttpParams()
            .set("page", (pageNumber - 1).toString())
            .set("size", pageSize.toString())

        for (const a of order) {
            params = params.append("sort", a.colId + ',' + a.sort)
        }

        if (filter) {
            let b = this.getAllColumns(incCol)
            for (let column of b) {
                let searchFilter = filter[column]
                if (searchFilter) {
                    params = params.append(column, searchFilter.filter)
                }
            }
        }

        return params
    }

    public static getAllColumns(incCol: any): Array<string> {
        return incCol.map((x: { field: any; }) => x.field)
    }
}