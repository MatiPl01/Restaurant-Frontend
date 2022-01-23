import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router';
import { ErrorMsg } from '../shared/schemas/others/error.schema';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private defaultDescription: string = 'Strona, którą próbujesz odwiedzić, nie została znaleziona'

    private description!: string
    private statusCode!: number
    private errMsg!: string

    constructor(private router: Router) {
        this.router.events.forEach((event: any) => {
            if (event instanceof NavigationEnd && this.router.url !== '/error') {
                this.reset()
            }
        })
    }

    displayError(statusCode: number, description: string = 'Coś poszło nie tak', errMsg: string = ''): void {
        this.description = description
        this.statusCode = statusCode
        this.errMsg = errMsg
        this.router.navigate(['/error'], { replaceUrl: true })
    }

    getDetails(): { statusCode: number, description: string, errMsg: string } {
        return {
            statusCode: this.statusCode,
            description: this.description || this.defaultDescription,
            errMsg: this.errMsg
        }
    }

    private reset(): void {
        // @ts-ignore
        this.description = this.errMsg = this.statusCode = undefined
    }
}
