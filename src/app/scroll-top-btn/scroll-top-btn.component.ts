import { Component, OnDestroy, OnInit, HostListener, ViewChild } from '@angular/core'
import { Subscription } from 'rxjs'
import { VisualizationService } from '../services/visualization.service'

@Component({
  selector: 'app-scroll-top-btn',
  templateUrl: './scroll-top-btn.component.html'
})
export class ScrollTopBtnComponent implements OnInit, OnDestroy {
  @ViewChild('btn') btn: any
  isVisible: boolean = true
  scrolledFarEnough: boolean = false
  minScrollY: number = 500

  subscriptions: Subscription[] = []
  
  constructor(private visualizationService: VisualizationService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.visualizationService.headerVisibilityChangedEvent.subscribe((isHeaderVisible: boolean) => {
        this.isVisible = !isHeaderVisible
      }),
      this.visualizationService.scrollAvailabilityChangedEvent.subscribe((canScroll: boolean) => {
        this.isVisible = canScroll
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription)
  }

  @HostListener("window:scroll", ["$event"])
  onWindowScroll() {
    this.scrolledFarEnough = window.scrollY > this.minScrollY
  }

  onClick() {
    this.visualizationService.scrollY(0)
    this.btn.nativeElement.classList.add('anim')
    setTimeout(() => {
      this.btn.nativeElement.classList.remove('anim')
    }, 750)
  }
}
