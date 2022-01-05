import { Injectable, EventEmitter } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class VisualizationService {
    headerVisibilityChangedEvent = new EventEmitter<boolean>();

    notifyHeaderVisible(isVisible: boolean) {
        this.headerVisibilityChangedEvent.emit(isVisible)
    }
}
