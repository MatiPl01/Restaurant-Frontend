import { Component, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { VisualizationService } from './services/visualization.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy {
  title = 'YummyFood'
  isMobileNavOpen: boolean = false
  subscription!: Subscription

  constructor(private visualizationService: VisualizationService) {
    this.subscription = this.visualizationService.menuToggleEvent.subscribe((isOpen: boolean) => {
      this.isMobileNavOpen = isOpen
      this.visualizationService.setScroll(!isOpen)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
