import { Injectable, EventEmitter } from '@angular/core'
import { Observable, throwError, tap, BehaviorSubject } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { User } from '../shared/models/db/user.model'
import { DataStorageService } from './data-storage.service'
import { NavigationService } from './navigation.service'
import { WebRequestService } from './web-request.service'

export enum Persistence {
    LOCAL = 'LOCAL',
    SESSION = 'SESSION',
    NONE = 'NONE'
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private saveDataKey: string = 'userData'
    userLoggedInEvent = new EventEmitter<User>()
    // @ts-ignore
    private _user!: BehaviorSubject<User> = new BehaviorSubject<User>(null)
    private _isUserLoggedIn: boolean = false
    private logoutTimeout: any
    public persistence: Persistence = Persistence.LOCAL

    constructor(private webRequestService: WebRequestService,
                private navigationService: NavigationService,
                private dataStorageService: DataStorageService) {}

    get user(): BehaviorSubject<User> {
        return this._user
    }

    get isUserLoggedIn(): boolean {
        return this.isUserLoggedIn
    }

    autoLogin(): void {
        // Try to load an user from the browser storage
        const loadedUser = this.loadUser()
        // Return if no user was found
        if (!loadedUser) return
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
        this.logoutTimeout = setTimeout(() => {
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
        this._isUserLoggedIn = false
        // @ts-ignore
        this.user.next(null)
        localStorage.removeItem(this.saveDataKey)
        this.logoutTimeout && clearTimeout(this.logoutTimeout)
        this.logoutTimeout = null
        window.location.reload()
        this.navigationService.addCurrentRoute()
    }

    setPersistence(persistence: Persistence): void {
        this.persistence = persistence
        this.removeStoredUser()
        if (persistence !== Persistence.NONE) {
            this.user.subscribe(this.storeUser.bind(this))
        }
        this.dataStorageService.updateConfig({
            login: {
                persistenceMode: persistence
            }
        }).subscribe()
    }

    getPersistenceModes(): string[] {
        const modes = []
        for (let mode in Persistence) modes.push(mode)
        return modes
    }

    setLoginConfig(config: any): void {
        this.removeStoredUser()
        // @ts-ignore
        this.persistence = Persistence[config.persistenceMode]
        if (this.persistence !== Persistence.NONE) {
            this.user.subscribe((user: User) => {
                if (user) this.storeUser(user)
            })
        }
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
        this._isUserLoggedIn = true

        this.autoLogout(expTime * 1000)
        if (this.persistence !== Persistence.NONE) {
            this.storeUser(user)
        }
    }

    private storeUser(user: User): void {
        if (this.persistence === Persistence.LOCAL) {
            localStorage.setItem(this.saveDataKey, JSON.stringify(user))
        } else if (this.persistence === Persistence.SESSION) {
            sessionStorage.setItem(this.saveDataKey, JSON.stringify(user))
        }
    }

    private removeStoredUser(): void {
        localStorage.removeItem(this.saveDataKey)
        sessionStorage.removeItem(this.saveDataKey)
    }

    private loadUser(): User {
        const userData = localStorage.getItem(this.saveDataKey) || sessionStorage.getItem(this.saveDataKey)
        // @ts-ignore
        const dataParsed = JSON.parse(userData)
        // @ts-ignore
        if (!dataParsed) return null
        const user = new User(dataParsed, dataParsed.token)
        return user
    }
}
