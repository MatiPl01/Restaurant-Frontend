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

  private dishesApiUrl: string = 'http://localhost:3000/v1/dishes' 
  private dishesMap: Map<string, Dish> = new Map()
  private dishesArray: Dish[] = []
  private minDishPrice: number = Infinity
  private maxDishPrice: number = 0

  // For now I will store information if an user rated a particular
  // dish in a Set below. After implementing database, I will be able
  // to distinguish users
  userRates: Map<string, number> = new Map()
  areDishesLoaded: boolean = false

  constructor(private http: HttpClient, 
              private currencyService: CurrencyService,
              private filtersService: FiltersService) {
    this.http
      .get<Dish>(this.dishesApiUrl)
      .subscribe((res: any) => this.loadDishesData(res.data))
  }

  loadDishesData(data: any) {
    data.forEach((dish: Dish) => {
      this.dishesMap.set(dish._id, dish)
      this.dishesArray.push(dish)
    })

    const sortBy = 'name'
    console.log(this.dishesArray.sort((d1: Dish, d2: Dish) => d1[sortBy] > d2[sortBy] ? 1 : -1)) 

    this.updateMaxUnitPrice()
    this.updateMinUnitPrice()
    this.areDishesLoaded = true
    this.dishesChangedEvent.emit(this.getDishes())
  }

  getDishes(): Dish[] {
    return [...this.dishesArray]
  }

  getDishWithID(id: number): Dish {
    // @ts-ignore
    return this.dishesMap.get(id)
  }

  removeDish(dish: Dish) {
    this.http
      .delete<Dish>(`${this.dishesApiUrl}/${dish._id}`)
      .subscribe(() => {
        this.dishesMap.delete(dish._id)
        this.dishesArray.splice(this.dishesArray.findIndex((d: Dish) => d._id === dish._id), 1)
        this.dishesChangedEvent.emit(this.getDishes())
        this.updateMinUnitPrice()
        this.updateMaxUnitPrice()
      })
    this.userRates.delete(dish._id)
  }

  addDish(dish: Dish) {
    this.http.post<Dish>(this.dishesApiUrl, dish, headers).subscribe()
    this.dishesMap.set(dish._id, dish)
    this.insertSorted(dish)
    this.dishesChangedEvent.emit(this.getDishes())
    
    const dishPrice = this.currencyService.calcDishReferencePrice(dish)
    if (dishPrice > this.maxDishPrice) this.maxDishPrice = +dishPrice.toFixed(2)
    if (dishPrice < this.minDishPrice) this.minDishPrice = +dishPrice.toFixed(2)
  }

  updateMinUnitPrice() {
    this.minDishPrice = Infinity
    for (let dish of this.dishesArray) {
      const dishPrice = +this.currencyService.calcDishReferencePrice(dish).toFixed(2)
      console.log('min price', dishPrice, this.minDishPrice)
      if (dishPrice < this.minDishPrice) this.minDishPrice = dishPrice
    }
  }

  updateMaxUnitPrice() {
    this.maxDishPrice = 0
    for (let dish of this.dishesArray) {
      const dishPrice = +this.currencyService.calcDishReferencePrice(dish).toFixed(2)
      if (dishPrice > this.maxDishPrice) this.maxDishPrice = dishPrice
    }
  }

  updateRating(dish: Dish, currRate: number) {
    if (!this.userRates.has(dish._id)) {
      dish.rating = +((dish.rating * dish.ratesCount + currRate) / (dish.ratesCount + 1)).toFixed(2)
      dish.ratesCount++
    } else {
      // @ts-ignore
      dish.rating = +((dish.rating * dish.ratesCount - this.userRates.get(dish._id) + currRate) / dish.ratesCount).toFixed(2)
    }
    this.userRates.set(dish._id, currRate)
    this.http.patch<Dish>(`${this.dishesApiUrl}/${dish._id}`, dish, headers).subscribe()
  
    const updatedDish = this.dishesMap.get(dish._id)
    updatedDish!.ratesCount = dish.ratesCount
    updatedDish!.rating = dish.rating
    this.filtersService.notifyChanges()
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
    for (let dish of this.dishesArray) result.add(dish[attr])
    return result
  }

  private insertSorted(dish: Dish, sortBy: string = 'name') {
    if (!this.dishesArray.length) this.dishesArray.push(dish)
    // @ts-ignore
    else if (dish[sortBy] <= this.dishesArray[0][sortBy]) this.dishesArray.unshift(dish)
    // @ts-ignore
    else if (dish[sortBy] >= this.dishesArray[this.dishesArray.length - 1][sortBy]) {
      this.dishesArray.unshift(dish)
    } 
    else {
      for (let i = 0; i < this.dishesArray.length - 1; i++) {
        // @ts-ignore
        if (this.dishesArray[i][sortBy] <= dish[sortBy] && dish[sortBy] <= this.dishesArray[i + 1][sortBy]) {
          this.dishesArray.splice(i, 0, dish)
          return
        }
      }
    }
  }
}
