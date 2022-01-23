import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { AuthService } from './services/auth.service'
import { NavigationService } from './services/navigation.service'
import { VisualizationService } from './services/visualization.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'YummyFood'
  isMobileNavOpen: boolean = false
  subscription!: Subscription

  // private userSubscription = new Subscription()

  constructor(private visualizationService: VisualizationService,
              private navigationService: NavigationService,
              private authService: AuthService) {
    this.subscription = this.visualizationService.menuToggleEvent.subscribe((isOpen: boolean) => {
      this.isMobileNavOpen = isOpen
      this.visualizationService.setScroll(!isOpen)
    })
  }

  ngOnInit(): void {
  //   this.userSubscription = this.authService.user.subscribe()
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
    // this.userSubscription.unsubscribe()
  }
}
