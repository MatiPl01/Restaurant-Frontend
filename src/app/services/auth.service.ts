import { Injectable } from '@angular/core'
import { Observable, Subject, throwError, tap, BehaviorSubject } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { User } from '../shared/models/db/user.model'
import { WebRequestService } from './web-request.service'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private _user!: BehaviorSubject<User>

    constructor(private webRequestService: WebRequestService) {}

    get user(): BehaviorSubject<User> {
        return this._user
    }

    registerUser(userData: Object): Observable<any> {
        return this.webRequestService
            .post('users/signup', userData)
            .pipe(
                catchError(this.handleError),
                tap(this.handleAuthentication)
            )
    }

    loginUser(userData: Object): Observable<any> {
        return this.webRequestService
            .post('users/login', userData)
            .pipe(
                catchError(this.handleError),
                tap(this.handleAuthentication)
            )
    }

    private handleError(errRes: any): any {
        let errorMsg = 'An unknown error has ocurred'
        if (errRes.error) errorMsg = errRes.error.message
        return throwError(() => errorMsg)
    }

    private handleAuthentication(resData: any): void {
        const { data, token } = resData
        const user = new User(data, token)
        this._user = new BehaviorSubject<User>(user)
        this._user.next(user)
    }
}
