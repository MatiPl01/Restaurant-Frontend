import { Component, Input, AfterViewInit, ElementRef } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { DishesService } from 'src/app/services/dishes.service'

@Component({
  selector: 'app-dish-rating',
  templateUrl: './dish-rating.component.html'
})
export class RatingComponent implements AfterViewInit {
  @Input() dish!: Dish
  currRate: number = 0
  radioInputs: HTMLInputElement[] = []

  constructor(private elRef: ElementRef,
              private dishesService: DishesService) {}

  ngAfterViewInit(): void {
    this.loadUserRate()
    const segmentsCount = +(2 * this.currRate).toFixed()
    if (segmentsCount > 0) {
      this.elRef.nativeElement.querySelector(`.rating__radio[value="${segmentsCount}"]`).checked = true
    }
  }

  onRateChange(event: Event) {
    this.currRate = parseInt((<HTMLInputElement>event.target).value) / 2
    this.dishesService.updateRating(this.dish, this.currRate)
  }

  private loadUserRate() {
    this.currRate = this.dishesService.getUserRate(this.dish.id)
  }
}
