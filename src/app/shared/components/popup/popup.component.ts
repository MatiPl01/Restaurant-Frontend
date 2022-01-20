import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core'

import { VisualizationService } from 'src/app/services/visualization.service'

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html'
})
export class PopupComponent implements OnInit {
  @Output() popupClosedEvent = new EventEmitter<void>()
  @Input() heading!: string

  constructor(private visualizationService: VisualizationService) {}

  ngOnInit(): void {
    this.visualizationService.setPopupOpen(true)
  }

  onClose(): void {
    this.visualizationService.setPopupOpen(false)
    this.popupClosedEvent.emit()
  }
}
