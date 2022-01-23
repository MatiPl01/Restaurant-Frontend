import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationEnd, NavigationStart, Router } from '@angular/router'
import { Subscription } from 'rxjs'
import { AuthService } from 'src/app/services/auth.service'

import { OrderService } from 'src/app/services/order.service'
import { PaginationService } from 'src/app/services/pagination.service'
import { VisualizationService } from 'src/app/services/visualization.service'
import { User } from 'src/app/shared/models/db/user.model'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit, OnDestroy {
  defaultPaginationQueryParams: Object = {}
  isHeaderVisible: boolean = false
  // @ts-ignore
  user: User = null

  subscriptions: Subscription[] = []
  isToggleChecked: boolean = false
  isNavToggleVisible: boolean = true
  displayAnimation: boolean = false

  constructor(private router: Router,
              public orderService: OrderService,
              public paginationService: PaginationService,
              private visualizationService: VisualizationService,
              private authService: AuthService) {
    this.router.events.forEach((event: any) => {
      if (event instanceof NavigationStart) {
        // Close mobile navbar menu if an url has changed
        visualizationService.notifyNavMenuToggle(false)
        this.isToggleChecked = false
      } else if (event instanceof NavigationEnd) {
        this.displayAnimation = this.router.url === '/'
      }
    })
  }

  ngOnInit(): void {
    this.defaultPaginationQueryParams = this.paginationService.getDefaultQueryParams()
      this.subscriptions.push(
        this.visualizationService.headerVisibilityChangedEvent.subscribe((isVisible: boolean) => {
        this.isHeaderVisible = isVisible
      }),
      this.visualizationService.popupDisplayChangedEvent.subscribe((isDisplayed: boolean) => {
        this.isNavToggleVisible = !isDisplayed
      }),
      this.authService.user.subscribe((user: User) => {
        this.user = user
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

  onToggle(): void {
    this.visualizationService.notifyNavMenuToggle(this.isToggleChecked)
  }

  onLogoutClick(): void {
    this.authService.logoutUser()
    this.closeNavMenu()
  }

  onRouteClick(): void {
    this.closeNavMenu()
  }

  private closeNavMenu(): void {
    this.isToggleChecked = false
    this.visualizationService.notifyNavMenuToggle(this.isToggleChecked)
  }
}
