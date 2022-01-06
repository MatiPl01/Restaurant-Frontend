import { Component, OnDestroy, OnInit } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { DishesService } from 'src/app/services/dishes.service'
import { CurrencyService } from 'src/app/services/currency.service'
import { FiltersService } from 'src/app/services/filters.service'
import { PaginationService } from 'src/app/services/pagination.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html'
})
export class DishesListComponent implements OnInit, OnDestroy {
  dishes: Dish[] = []
  
  filteringTrigger: number = 0
  paginationTrigger: number = 0

  subscriptions: Subscription[] = []
 
  constructor(public paginationService: PaginationService,
              private currencyService: CurrencyService, 
              public dishesService: DishesService, 
              public filtersService: FiltersService) {}

  ngOnInit(): void {
    this.filtersService.resetFilters()
    this.dishes = this.dishesService.getDishes()

    this.subscriptions.push(
      this.dishesService.dishesChangedEvent.subscribe((dishes: Dish[]) => {
        this.dishes = dishes
        this.paginationService.updateDisplayedDishesCount(dishes.length)
      }),
      this.filtersService.filtersChangedEvent.subscribe(() => {
        // Refilter dishes if filtering criteria changed and
        // go to the first page of the dishes list
        this.refilterDishes()
      }),
      this.paginationService.pagesChanged.subscribe(this.updatePages.bind(this))
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
      cheap: dishPrice === this.dishesService.getMinUnitPrice(),
      expensive: dishPrice === this.dishesService.getMaxUnitPrice()
    }
  }

  private refilterDishes() {
    this.filteringTrigger = (this.filteringTrigger + 1) % 2
  }

  private updatePages() {
    this.paginationTrigger = (this.paginationTrigger + 1) % 2
  }
}
