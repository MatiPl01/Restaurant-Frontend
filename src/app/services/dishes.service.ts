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
  private dishesMap: Map<number, Dish> = new Map()
  private minDishPrice: number = Infinity
  private maxDishPrice: number = 0
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
        this.dishesChangedEvent.emit(this.getDishes())
      })
  }

  loadDishesData(data: any) {
    data.forEach((dish: Dish) => {
      this.dishesMap.set(dish.id, dish)
      this.maxDishID = Math.max(this.maxDishID, dish.id)
    })
  }

  getDishes(): Dish[] {
    return [...this.dishesMap.values()]
  }

  getDishWithID(id: number): Dish {
    // @ts-ignore
    return this.dishesMap.get(id)
  }

  removeDish(dish: Dish) {
    this.http
      .delete<Dish>(`${this.dishesJsonUrl}/${dish.id}`)
      .subscribe(() => {
        this.dishesMap.delete(dish.id)
        this.dishesChangedEvent.emit(this.getDishes())
        this.updateMinUnitPrice()
        this.updateMaxUnitPrice()
      })
    this.userRates.delete(dish.id)
  }

  addDish(dish: Dish) {
    this.maxDishID++
    this.http.post<Dish>(this.dishesJsonUrl, dish, headers).subscribe()
    this.dishesMap.set(dish.id, dish)
    this.dishesChangedEvent.emit(this.getDishes())
    
    const dishPrice = this.currencyService.calcDishReferencePrice(dish)
    if (dishPrice > this.maxDishPrice) this.maxDishPrice = dishPrice
    if (dishPrice < this.minDishPrice) this.minDishPrice = dishPrice
  }

  updateMinUnitPrice() {
    this.minDishPrice = Infinity
    for (let dish of this.dishesMap.values()) {
      const dishPrice = this.currencyService.calcDishReferencePrice(dish)
      if (dishPrice < this.minDishPrice) this.minDishPrice = dishPrice
    }
  }

  updateMaxUnitPrice() {
    this.maxDishPrice = 0
    for (let dish of this.dishesMap.values()) {
      const dishPrice = this.currencyService.calcDishReferencePrice(dish)
      if (dishPrice > this.maxDishPrice) this.maxDishPrice = dishPrice
    }
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
  
    const updatedDish = this.dishesMap.get(dish.id)
    updatedDish!.ratesCount = dish.ratesCount
    updatedDish!.rating = dish.rating
    this.filtersService.notifyRatingChanged()
  }
  
  getMaxReferencePrice() {
    return this.maxDishPrice
  }

  getMinReferencePrice() {
    return this.minDishPrice
  }

  getValuesSet(attr: string): any {
    const result = new Set()
    // @ts-ignore
    for (let dish of this.dishesMap.values()) result.add(dish[attr])
    return result
  }

  getUserRate(dishID: number): number {
    return this.userRates.get(dishID) || 0
  }
}
