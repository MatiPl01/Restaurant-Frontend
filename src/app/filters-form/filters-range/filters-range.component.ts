import { Component, Input, EventEmitter, Output } from '@angular/core';
import { Options } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-filters-range',
  templateUrl: './filters-range.component.html',
  styleUrls: ['./filters-range.component.scss']
})
export class FiltersRangeComponent {
  @Output() rangeChangedEvent = new EventEmitter<{filterAttr: string, min: number, max: number}>()
  @Input() filterAttr!: string
  @Input('minSet') minSetValue!: number
  @Input('maxSet') maxSetValue!: number
  @Input() options!: Options

  onChange() {
    this.rangeChangedEvent.emit({
      filterAttr: this.filterAttr,
      min: this.minSetValue,
      max: this.maxSetValue
    })
  }
}
