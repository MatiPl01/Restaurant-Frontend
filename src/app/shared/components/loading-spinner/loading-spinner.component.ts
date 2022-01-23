import { Component, Input } from "@angular/core"

@Component({
    selector: 'app-loading-spinner',
    template: `
    <div class="loading-spinner" [ngClass]="{visible}">
        <svg class="loading-spinner__svg" viewBox="0 0 32 32">
            <circle cx='16' cy='16' r='16' />
        </svg>
    </div>
    `
})
export class LoadingSpinnerComponent {
    @Input() visible!: boolean
}
