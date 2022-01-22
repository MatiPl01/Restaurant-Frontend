import { Injectable } from '@angular/core'
import { NavigationEnd, Router } from '@angular/router';
import { ErrorMsg } from '../shared/models/error.model';

@Injectable({
    providedIn: 'root'
})
export class ErrorService {
    private defaultDescription: string = 'Strona, którą próbujesz odwiedzić, nie została znaleziona'

    private description: string = ''
    private status: string = ''
    private message: string = ''

    constructor(private router: Router) {
        this.router.events.forEach((event: any) => {
            if (event instanceof NavigationEnd && this.router.url !== '/error') {
                this.reset()
            }
        })
    }

    displayError(error: ErrorMsg, description: string = 'Coś poszło nie tak'): void {
        this.status = error.status
        this.message = error.message
        this.description = description
        this.router.navigate(['/error'], { replaceUrl: true })
    }

    getDetails(): { description: string, status: string, message: string } {
        return {
            description: this.description || this.defaultDescription,
            status: this.status,
            message: this.message
        }
    }

    private reset(): void {
        this.description = this.status = this.message = ''
    }
}
