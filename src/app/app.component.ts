import { Component, HostListener, OnDestroy, OnInit } from '@angular/core'
import { Observable, Subscription } from 'rxjs'
import { AuthService } from './services/auth.service'
import { DataStorageService } from './services/data-storage.service'
import { OrderService } from './services/order.service'
import { VisualizationService } from './services/visualization.service'
import { Config } from './shared/models/db/config.model'
import { User } from './shared/models/db/user.model'
import { Cart } from './shared/schemas/others/cart.schema'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnDestroy, OnInit {
  title = 'YummyFood'
  isMobileNavOpen: boolean = false
  subscriptions: Subscription[] = []

  constructor(private visualizationService: VisualizationService,
              private authService: AuthService,
              private dataStorageService: DataStorageService,
              private orderService: OrderService) {
    this.subscriptions.push(
      this.visualizationService.menuToggleEvent.subscribe((isOpen: boolean) => {
        this.isMobileNavOpen = isOpen
        this.visualizationService.setScroll(!isOpen)
      }),
      this.dataStorageService.fetchConfig().subscribe(),
      this.dataStorageService.configChangedEvent.subscribe((config: Config) => {
        this.authService.setLoginConfig(config.login)
      }),
      this.authService.user.subscribe((user: User) => {
        if (user) this.orderService.loadUserCart()
      })
    )
  }

  ngOnInit(): void {
    this.authService.autoLogin()
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }
}
