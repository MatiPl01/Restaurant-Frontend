import { Component, OnDestroy, OnInit } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { DishesService } from 'src/app/services/dishes.service'
import { CurrencyService } from 'src/app/services/currency.service'
import { FiltersService } from 'src/app/services/filters.service'
import { PaginationService } from 'src/app/services/pagination.service'
import { Subscription } from 'rxjs'
import { ActivatedRoute, Params } from '@angular/router'

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html'
})
export class DishesListComponent implements OnInit, OnDestroy {
  dishes: Dish[] = []
  
  pageIdx: number = 1
  dishesPerPage: number = 10
  filteringTrigger: number = 0
  paginationTrigger: number = 0

  subscriptions: Subscription[] = []
 
  constructor(private activatedRoute: ActivatedRoute,
              public paginationService: PaginationService,
              private currencyService: CurrencyService, 
              public dishesService: DishesService, 
              public filtersService: FiltersService) {}

  ngOnInit(): void {
    // Try to load saved data
    this.filtersService.resetFilters()
    this.dishes = this.dishesService.getDishes()
    if (this.dishes.length) {
      this.paginationService.setDisplayedDishesCount(this.dishes.length)
      this.paginationService.setQueryParams(this.activatedRoute.snapshot.queryParams)
    }

    // Setup event observers
    this.subscriptions.push(
      this.dishesService.dishesChangedEvent.subscribe((dishes: Dish[]) => {
        this.dishes = dishes
        this.paginationService.setDisplayedDishesCount(dishes.length)
        this.subscriptions.push(
          this.activatedRoute.queryParams.subscribe((params: Params) => {
            this.paginationService.setQueryParams(params)
          })
        )
      }),
      this.filtersService.filtersChangedEvent.subscribe(this.refilterDishes.bind(this)),
      this.paginationService.pagesChangedEvent.subscribe(this.updatePages.bind(this))
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  onRemoveDish(dish: Dish) {
    this.dishesService.removeDish(dish)
  }

  getClassObj(dish: Dish) {
    const dishPrice = this.currencyService.exchangeAmount(dish.unitPrice, dish.currency, this.currencyService.getReferenceCurrency())
    return {
      cheap: dishPrice === this.dishesService.getMinReferencePrice(),
      expensive: dishPrice === this.dishesService.getMaxReferencePrice()
    }
  }

  private refilterDishes() {
    this.filteringTrigger = (this.filteringTrigger + 1) % 2
  }

  // private recalculatePages() {
  //   this.paginationTrigger = (this.paginationTrigger + 1) % 2
  // }

  private updatePages(data: any): void {
    this.dishesPerPage = data.dishesPerPage
    this.pageIdx = data.pageNum - 1
  }
}
