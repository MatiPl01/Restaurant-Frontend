import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { Subscription } from 'rxjs'

import { Dish } from 'src/app/shared/models/db/dish.model'

import { CurrencyService } from 'src/app/services/currency.service'
import { PaginationService } from 'src/app/services/pagination.service'
import { VisualizationService } from 'src/app/services/visualization.service'
import { ErrorService } from 'src/app/services/error.service'
import { DataStorageService } from 'src/app/services/data-storage.service'

@Component({
  selector: 'app-dish-page',
  templateUrl: './dish-page.component.html'
})
export class DishPageComponent implements OnInit, OnDestroy {
  dish!: Dish
  subscription!: Subscription

  constructor(private elRef: ElementRef,
              private activatedRoute: ActivatedRoute,
              private visualizationService: VisualizationService,
              private errorService: ErrorService,
              public paginationService: PaginationService,
              public currencyService: CurrencyService,
              private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    const dishID = this.activatedRoute.snapshot.params['id']
    this.subscription = this.dataStorageService.fetchDish(dishID).subscribe({
      next: (res: any) => this.dish = res.data,
      error: (err: any) => {
        this.errorService.displayError(404, 'Potrawa o podanym ID została znaleziona')
      }
    })

  }

  ngAfterViewInit() {
    this.visualizationService.scrollY(0, false)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
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

  private scrollToReviews(): void {
    const reviewsEl = this.elRef.nativeElement.querySelector('.dish-page__reviews')
    this.visualizationService.scrollY(reviewsEl.getBoundingClientRect().top - 100)
  }
}
