import { Injectable, EventEmitter } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class VisualizationService {
    headerVisibilityChanged = new EventEmitter<boolean>();

    notifyHeaderVisible(isVisible: boolean) {
        this.headerVisibilityChanged.emit(isVisible);
    }
}
