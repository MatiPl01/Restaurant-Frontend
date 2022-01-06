import { Component, OnDestroy, OnInit } from '@angular/core'
import { Subscription } from 'rxjs'
import { VisualizationService } from '../services/visualization.service'

@Component({
  selector: 'app-scroll-top-btn',
  templateUrl: './scroll-top-btn.component.html'
})
export class ScrollTopBtnComponent implements OnInit, OnDestroy {
  isHeaderVisible: boolean = false

  subscription!: Subscription
  
  constructor(private visualizationService: VisualizationService) {}

  ngOnInit() {
    this.subscription = this.visualizationService.headerVisibilityChangedEvent.subscribe((isVisible: boolean) => {
      this.isHeaderVisible = isVisible
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

  onClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
