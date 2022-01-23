import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from './services/auth.service'
import { VisualizationService } from './services/visualization.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'YummyFood'
  isMobileNavOpen: boolean = false
  subscription!: Subscription

  constructor(private visualizationService: VisualizationService,
              private authService: AuthService) {
    this.subscription = this.visualizationService.menuToggleEvent.subscribe((isOpen: boolean) => {
      this.isMobileNavOpen = isOpen
      this.visualizationService.setScroll(!isOpen)
    })
  }

  ngOnInit(): void {
    this.authService.autoLogin()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
