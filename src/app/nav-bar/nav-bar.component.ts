import { Component, OnDestroy, OnInit } from '@angular/core'
import { VisualizationService } from '../services/visualization.service'
import { OrderService } from '../services/order.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit, OnDestroy {
  isHeaderVisible: boolean = false

  subscription!: Subscription

  constructor(private visualizationService: VisualizationService, public orderService: OrderService) {}

  ngOnInit(): void {
    this.subscription = this.visualizationService.headerVisibilityChangedEvent.subscribe((isVisible: boolean) => {
      this.isHeaderVisible = isVisible
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
