import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core'
import { Router } from '@angular/router'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

import { Dish } from 'src/app/shared/models/dish.model'

import { DishesService } from 'src/app/services/dishes.service'
import { CurrencyService } from 'src/app/services/currency.service'
import { PaginationService } from 'src/app/services/pagination.service'
import { VisualizationService } from 'src/app/services/visualization.service'

@Component({
  selector: 'app-dish-page',
  templateUrl: './dish-page.component.html'
})
export class DishPageComponent implements OnInit, OnDestroy {
  dish!: Dish
  dishID!: string
  subscriptions: Subscription[] = []

  constructor(private elRef: ElementRef,
              private router: Router,
              private activatedRoute: ActivatedRoute,
              private visualizationService: VisualizationService,
              private dishesService: DishesService,
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
    this.dish = this.dishesService.getDishWithID(this.dishID)

    // TODO - redirect to the not found page when dish doesn't exist (probably shouldn't do this inside this function)

    // // Redirect to the not-found page if there is no dish of a specified id
    // if (!this.dish) this.router.navigate(['not-found']) // TODO  - prevent going back to the not found dish page
  }

  private scrollToReviews(): void {
    const reviewsEl = this.elRef.nativeElement.querySelector('.dish-page__reviews')
    this.visualizationService.scrollY(reviewsEl.getBoundingClientRect().top - 100)
  }
}
