import { Injectable } from '@angular/core'
import { Observable } from 'rxjs';
import { WebRequestService } from './web-request.service';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    constructor(private webRequestService: WebRequestService) {}

    registerUser(userData: Object): Observable<any> {
        return this.webRequestService.post('users/signup', userData)
    }

    loginUser(userData: Object): Observable<any> {
        return this.webRequestService.post('users/login', userData)
    }
}
