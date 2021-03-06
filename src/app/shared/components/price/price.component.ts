import { Component, Input } from '@angular/core'

@Component({
  selector: 'app-price',
  templateUrl: './price.component.html'
})
export class PriceComponent {
  @Input() amount!: number
  @Input() currency!: string
}
