import { Injectable, EventEmitter } from '@angular/core'
import { Observable, throwError, tap, BehaviorSubject } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { User } from '../shared/models/db/user.model'
import { NavigationService } from './navigation.service'
import { WebRequestService } from './web-request.service'

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userLoggedInEvent = new EventEmitter<User>()
    // @ts-ignore
    private _user!: BehaviorSubject<User> = new BehaviorSubject<User>(null)
    private logoutTimeout: any

    constructor(private webRequestService: WebRequestService,
                private navigationService: NavigationService) {}

    get user(): BehaviorSubject<User> {
        return this._user
    }

    autoLogin(): void {
        // @ts-ignore
        const userData = JSON.parse(localStorage.getItem('userData'))
        // Return if there is no user data saved in a browser
        if (!userData) return
        // Otherwise try to log user in again
        const loadedUser = new User(userData, userData.token)
        // If a token is valid (hasn't expired), log in an user again
        if (loadedUser.getToken()) {
            // Set auto logout time
            const expTime = loadedUser.getTokenExpirationTime()
            const timeout = new Date(expTime).getTimezoneOffset() - new Date().getTime()
            this.autoLogout(timeout)
            // Login the user
            this.user.next(loadedUser)
        }
    }

    autoLogout(timeout: number): void {
        setTimeout(() => {
            this.logoutUser()
        }, timeout)
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
        // @ts-ignore
        this.user.next(null)
        localStorage.removeItem('userData')
        this.logoutTimeout && clearTimeout(this.logoutTimeout)
        this.logoutTimeout = null
        window.location.reload()
        this.navigationService.addCurrentRoute()
    }

    private handleError(errRes: any): any {
        let errorMsg = 'Wystąpił niezidentyfikowany problem'
        if (errRes.error) errorMsg = errRes.error.message
        return throwError(() => errorMsg)
    }

    private handleAuthentication(resData: any): void {
        const { data, token } = resData
        const user = new User(data, token)
        this._user.next(user)
        const expTime = user.getTokenExpirationTime()
        this.autoLogout(expTime * 1000)
        localStorage.setItem('userData', JSON.stringify(user))
    }
}
