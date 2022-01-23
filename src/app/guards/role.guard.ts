import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router"
import { Observable, map, first } from "rxjs";

import { AuthService } from "../services/auth.service";

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private authService: AuthService) {}

    canActivate(route: ActivatedRouteSnapshot, router: RouterStateSnapshot):
        boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            first(),
            map(user => {
                const userRoles = user.getRoles()

                for (let role of route.data['expectedRoles']) {
                    if (userRoles.indexOf(role) >= 0) return true
                }
                
                return false
            })
        )
    }
}
