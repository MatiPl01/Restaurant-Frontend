import { Component, OnInit } from '@angular/core';
import { VisualizationService } from '../services/visualization.service';

@Component({
  selector: 'app-scroll-top-btn',
  templateUrl: './scroll-top-btn.component.html'
})
export class ScrollTopBtnComponent implements OnInit {
  isHeaderVisible: boolean = false
  
  constructor(private visualizationService: VisualizationService) {}

  ngOnInit() {
    this.visualizationService.headerVisibilityChangedEvent.subscribe((isVisible: boolean) => {
      this.isHeaderVisible = isVisible
    })
  }

  onClick() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }
}
