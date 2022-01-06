import { Injectable, EventEmitter } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

import { Dish } from 'src/app/shared/models/dish.model'
import { CurrencyService } from './currency.service'
import { FiltersService } from './filters.service'

const headers = {
  headers: new HttpHeaders ({
    'Content-type': 'application/json',
  })
}

@Injectable({
  providedIn: 'root'
})
export class DishesService {
  dishesChangedEvent = new EventEmitter<Dish[]>()
  dishAddedEvent = new EventEmitter<Dish>()
  dishRemovedEvent = new EventEmitter<Dish>()
  ratingChangedEvent = new EventEmitter<Dish>()

  // json-server --watch -p 3000 src/assets/json/dishes.json
  private dishesJsonUrl: string = 'http://localhost:3000/dishes' 
  private dishes: Dish[] = []
  private minUnitPrice: number = Infinity
  private maxUnitPrice: number = 0
  maxDishID: number = 0

  // For now I will store information if an user rated a particular
  // dish in a Set below. After implementing database, I will be able
  // to distinguish users
  userRates: Map<number, number> = new Map()

  constructor(private http: HttpClient, 
              private currencyService: CurrencyService,
              private filtersService: FiltersService) {
    this.http
      .get<Dish>(this.dishesJsonUrl)
      .subscribe(data => {
        this.loadDishesData(data)
        this.updateMaxUnitPrice()
        this.updateMinUnitPrice()
        this.dishesChangedEvent.emit(this.dishes)
      })
  }

  loadDishesData(data: any) {
    data.forEach((dish: Dish) => {
      this.dishes.push(dish)
      this.maxDishID = Math.max(this.maxDishID, dish.id)
    })
  }

  getDishes(): Dish[] {
    return this.dishes.slice()
  }

  removeDish(dish: Dish) {
    this.http
      .delete<Dish>(`${this.dishesJsonUrl}/${dish.id}`)
      .subscribe(() => {
        const idx = this.dishes.findIndex((d: Dish) => d.id === dish.id)
        this.dishes.splice(idx, 1)
        this.dishesChangedEvent.emit(this.getDishes())
        this.updateMinUnitPrice()
        this.updateMaxUnitPrice()
      })
    this.userRates.delete(dish.id)
  }

  addDish(dish: Dish) {
    this.maxDishID++
    this.http.post<Dish>(this.dishesJsonUrl, dish, headers).subscribe()
    this.dishes.push(dish)
    this.dishesChangedEvent.emit(this.getDishes())
  }

  updateMinUnitPrice() {
    this.minUnitPrice = Infinity
    this.dishes.forEach((dish: Dish) => {
      const dishPrice = this.currencyService.exchangeAmount(dish.unitPrice, dish.currency, this.currencyService.getReferenceCurrency())
      if (dishPrice < this.minUnitPrice) this.minUnitPrice = dishPrice
    })
  }

  updateMaxUnitPrice() {
    this.maxUnitPrice = 0
    this.dishes.forEach((dish: Dish) => {
      const dishPrice = this.currencyService.exchangeAmount(dish.unitPrice, dish.currency, this.currencyService.getReferenceCurrency())
      if (dishPrice > this.maxUnitPrice) this.maxUnitPrice = dishPrice
    })
  }

  updateRating(dish: Dish, currRate: number) {
    if (!this.userRates.has(dish.id)) {
      dish.rating = +((dish.rating * dish.ratesCount + currRate) / (dish.ratesCount + 1)).toFixed(2)
      dish.ratesCount++
    } else {
      // @ts-ignore
      dish.rating = +((dish.rating * dish.ratesCount - this.userRates.get(dish.id) + currRate) / dish.ratesCount).toFixed(2)
    }
    this.userRates.set(dish.id, currRate)
    this.http.put<Dish>(`${this.dishesJsonUrl}/${dish.id}`, dish, headers).subscribe()
  
    const updatedDish = this.dishes.find(d => dish.id === d.id)
    updatedDish!.ratesCount = dish.ratesCount
    updatedDish!.rating = dish.rating
    this.filtersService.notifyRatingChanged()
  }
  
  getMaxUnitPrice() {
    return this.maxUnitPrice
  }

  getMinUnitPrice() {
    return this.minUnitPrice
  }

  getValuesSet(attr: string): any {
    const result = new Set()
    // @ts-ignore
    this.dishes.forEach((dish: Dish) => result.add(dish[attr]))
    return result
  }

  getUserRate(dishID: number): number {
    return this.userRates.get(dishID) || 0
  }
}
