import { Component, OnInit } from '@angular/core';
import { VisualizationService } from '../services/visualization.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html'
})
export class NavBarComponent implements OnInit {
  isHeaderVisible: boolean = false

  constructor(private visualizationService: VisualizationService, public orderService: OrderService) {}

  ngOnInit(): void {
    this.visualizationService.headerVisibilityChangedEvent.subscribe((isVisible: boolean) => {
      this.isHeaderVisible = isVisible
    })
  }

  onBtnCartClick() {
    this.orderService.onBtnCartClick()
  }
}
