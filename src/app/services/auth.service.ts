import { Injectable, EventEmitter } from '@angular/core'
import { Observable, throwError, tap, BehaviorSubject } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { User } from '../shared/models/db/user.model'
import { WebRequestService } from './web-request.service'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userLoggedInEvent = new EventEmitter<User>()
    // @ts-ignore
    private _user!: BehaviorSubject<User> = new BehaviorSubject<User>(null)

    constructor(private webRequestService: WebRequestService) {}

    get user(): BehaviorSubject<User> {
        return this._user
    }
    registerUser(userData: Object): Observable<any> {
        return this.webRequestService
            .post('users/signup', userData)
            .pipe(
                catchError(this.handleError),
                tap(this.handleAuthentication.bind(this))
            )
    }

    loginUser(userData: Object): Observable<any> {
        return this.webRequestService
            .post('users/login', userData)
            .pipe(
                catchError(this.handleError),
                tap(this.handleAuthentication.bind(this))
            )
    }

    logoutUser(): void {
        // TODO
        console.log('LOGOUT')
    }

    private handleError(errRes: any): any {
        let errorMsg = 'An unknown error has ocurred'
        if (errRes.error) errorMsg = errRes.error.message
        return throwError(() => errorMsg)
    }

    private handleAuthentication(resData: any): void {
        const { data, token } = resData
        const user = new User(data, token)
        this._user.next(user)
    }
}
