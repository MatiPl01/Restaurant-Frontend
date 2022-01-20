import { Component, OnDestroy, OnInit } from '@angular/core'
import { VisualizationService } from '../services/visualization.service'
import { OrderService } from '../services/order.service'
import { Subscription } from 'rxjs'
import { PaginationService } from '../services/pagination.service'
import { NavigationStart, Router } from '@angular/router'

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
