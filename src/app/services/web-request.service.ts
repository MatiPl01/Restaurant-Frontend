import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'

const defaultHeaders = new HttpHeaders({
    'Content-type': 'application/json',
})

@Injectable({
    providedIn: 'root'
})
export class WebRequestService {
    private readonly API_URL: string = 'http://localhost:3000/v1'

    constructor(private http: HttpClient) {}

    get(url: string, headers: HttpHeaders = defaultHeaders): Observable<any> {
        return this.http.get(`${this.API_URL}/${url}`, { headers })
    }

    post(url: string, obj: Object, headers: HttpHeaders = defaultHeaders): Observable<any> {
        return this.http.post(`${this.API_URL}/${url}`, obj, { headers })
    }

    patch(url: string, obj: Object, headers: HttpHeaders = defaultHeaders): Observable<any> {
        return this.http.patch(`${this.API_URL}/${url}`, obj, { headers })
    }

    delete(url: string, headers: HttpHeaders = defaultHeaders): Observable<any> {
        return this.http.delete(`${this.API_URL}/${url}`, { headers })
    }
}
