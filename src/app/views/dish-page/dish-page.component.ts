import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

import { Dish } from 'src/app/shared/models/dish.model'

import { DishesService } from 'src/app/services/dishes.service'
import { CurrencyService } from 'src/app/services/currency.service'
import { PaginationService } from 'src/app/services/pagination.service'
import { VisualizationService } from 'src/app/services/visualization.service'
import { ErrorService } from 'src/app/services/error.service'

@Component({
  selector: 'app-dish-page',
  templateUrl: './dish-page.component.html'
})
export class DishPageComponent implements OnInit, OnDestroy {
  dish!: Dish
  dishID!: string
  subscriptions: Subscription[] = []

  constructor(private elRef: ElementRef,
              private activatedRoute: ActivatedRoute,
              private visualizationService: VisualizationService,
              private dishesService: DishesService,
              private errorService: ErrorService,
              public paginationService: PaginationService,
              public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.dishID = this.activatedRoute.snapshot.params['id']
    this.loadDishData()

    this.subscriptions.push(
      this.dishesService.dishesChangedEvent.subscribe(this.loadDishData.bind(this))
    )
  }

  ngAfterViewInit() {
    this.visualizationService.scrollY(0, false)
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  onReviewsClick() {
    this.scrollToReviews()
  }

  getImagesAlts(): string[] {
    return new Array(this.dish.images.gallery.length).fill('').map(_ => this.dish.name)
  }

  getRatingText(): string {
    const lastDigit = this.dish.ratesCount % 10
    if (lastDigit === 0 || 5 <= lastDigit && lastDigit <= 9 || lastDigit === 1 && this.dish.ratesCount > 10 || this.dish.ratesCount >= 10 && this.dish.ratesCount <= 21) return 'ocen'
    if (lastDigit === 1) return 'ocena'
    return 'oceny'
  }

  private loadDishData(): void {
    // this.dish = this.dishesService.getDishWithID(this.dishID)

    this.dishesService.getDishWithID(this.dishID).subscribe({
      next: (res: any) => {
        this.dish = res.data
      },
      error: err => {
        console.log(err)
        this.errorService.displayError(err.error, 'Potrawa o wskazanym ID nie istnieje')
      }
    })
  }

  private scrollToReviews(): void {
    const reviewsEl = this.elRef.nativeElement.querySelector('.dish-page__reviews')
    this.visualizationService.scrollY(reviewsEl.getBoundingClientRect().top - 100)
  }
}
