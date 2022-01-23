import { Injectable } from "@angular/core"
import { HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http"
import { AuthService } from "../auth.service"
import { exhaustMap, first } from "rxjs/operators"
import { User } from "src/app/shared/models/db/user.model"

@Injectable({
    providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        return this.authService.user.pipe(
            first(),
            exhaustMap((user: User) => {
                // Try to make an original request if there is no user logged in
                if (!user) return next.handle(req)
                // Otherwise, send a request with user JWT token
                const token = user.getToken()
                const modifiedReq = req.clone({
                    headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
                })
                console.log('USING TOKEN:', token, user)
                return next.handle(modifiedReq)
            })
        )
    }
}
