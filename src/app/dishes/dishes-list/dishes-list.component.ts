import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/shared/models/dish.model';
import { DishesService } from 'src/app/services/dishes.service';
import { CurrencyService } from 'src/app/services/currency.service';
import { FiltersService } from 'src/app/services/filters.service';

@Component({
  selector: 'app-dishes-list',
  templateUrl: './dishes-list.component.html'
})
export class DishesListComponent implements OnInit {
  dishes: Dish[] = []

  filtersFunctions: any = {
    category: () => true,
    cuisine: () => true,
    unitPrice: () => true,
    rating: () => true
  }
 
  constructor(public dishesService: DishesService, private currencyService: CurrencyService, public filtersService: FiltersService) {}

  ngOnInit(): void {
    this.dishes = this.dishesService.getDishes()
    this.dishesService.dishesChangedEvent.subscribe((dishes: Dish[]) => this.dishes = dishes)
    this.filtersService.filtersChangedEvent.subscribe((filterAttr: string) => this.updateFilters(filterAttr))
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

  updateFilters(filterAttr: string) {
    this.filtersFunctions[filterAttr] = this.filtersService.getFilters(filterAttr)
  }
}
