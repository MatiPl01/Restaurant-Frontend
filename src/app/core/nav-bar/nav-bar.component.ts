import { Component, OnDestroy, OnInit } from '@angular/core'
import { NavigationStart, Router } from '@angular/router'
import { Subscription } from 'rxjs'

import { OrderService } from 'src/app/services/order.service'
import { PaginationService } from 'src/app/services/pagination.service'
import { VisualizationService } from 'src/app/services/visualization.service'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit, OnDestroy {
  defaultPaginationQueryParams: Object = {}
  isHeaderVisible: boolean = false

  subscriptions: Subscription[] = []
  isToggleChecked: boolean = false
  isNavToggleVisible: boolean = true

  constructor(private router: Router,
              public orderService: OrderService,
              public paginationService: PaginationService,
              private visualizationService: VisualizationService) {
    this.router.events.forEach((event: any) => {
      if (event instanceof NavigationStart) {
        // Close mobile navbar menu if an url has changed
        visualizationService.notifyNavMenuToggle(false)
        this.isToggleChecked = false
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
      })
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe())
  }

  onToggle(): void {
    this.visualizationService.notifyNavMenuToggle(this.isToggleChecked)
  }
}
