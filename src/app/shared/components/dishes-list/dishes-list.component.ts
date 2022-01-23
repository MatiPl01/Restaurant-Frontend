import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Params } from '@angular/router'
import { Subscription } from 'rxjs'

import { Dish } from 'src/app/shared/models/db/dish.model'

import { DishesService } from 'src/app/services/dishes.service'
import { CurrencyService } from 'src/app/services/currency.service'
import { FiltersService } from 'src/app/services/filters.service'
import { PaginationService } from 'src/app/services/pagination.service'
import { DataStorageService } from 'src/app/services/data-storage.service'

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
  queryParamsSubscription!: Subscription
 
  constructor(private activatedRoute: ActivatedRoute,
              public paginationService: PaginationService,
              private dataStorageService: DataStorageService,
              private currencyService: CurrencyService, 
              public dishesService: DishesService, 
              public filtersService: FiltersService) {}

  ngOnInit(): void {
    this.dishesService.loadDishes()

    // Setup event observers
    this.subscriptions.push(
      this.dataStorageService.dishesChangedEvent.subscribe((dishes: Dish[]) => {
        this.dishes = dishes
        this.paginationService.setDisplayedDishesCount(dishes.length)
        this.recalculatePages()
        if (!this.queryParamsSubscription) this.subscribeQueryParams()
        
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
    const dishPrice = +this.currencyService.calcDishReferencePrice(dish).toFixed(2)
    return {
      cheap: dishPrice === this.dishesService.getMinReferencePrice(),
      expensive: dishPrice === this.dishesService.getMaxReferencePrice()
    }
  }

  private refilterDishes() {
    console.log('refilter')
    this.filteringTrigger = (this.filteringTrigger + 1) % 2
  }

  private recalculatePages() {
    console.log('repaginate')
    this.paginationTrigger = (this.paginationTrigger + 1) % 2
  }

  private updatePages(data: any): void {
    this.dishesPerPage = data.dishesPerPage
    this.pageIdx = data.pageNum - 1
  }

  private subscribeQueryParams(): void {
    this.queryParamsSubscription = this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.paginationService.setQueryParams(params)
    })
    this.subscriptions.push(this.queryParamsSubscription)
  }
}
