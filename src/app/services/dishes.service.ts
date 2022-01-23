import { Injectable } from '@angular/core'
import { Dish } from 'src/app/shared/models/db/dish.model'
import { CurrencyService } from './currency.service'
import { DataStorageService } from './data-storage.service'

@Injectable({
    providedIn: 'root'
})
export class DishesService {
    private minDishPrice: number = Infinity
    private maxDishPrice: number = 0

    dishesArray: Dish[] = []
    areDishesLoaded: boolean = false

    constructor(private currencyService: CurrencyService,
                private dataStorageService: DataStorageService) {}

    loadDishes(): void {
        this.dataStorageService.fetchDishes((dishes: Dish[]) => {
            this.updateMaxUnitPrice(dishes)
            this.updateMinUnitPrice(dishes)
            const sortBy = 'name'
            dishes.sort((d1: Dish, d2: Dish) => d1[sortBy] > d2[sortBy] ? 1 : -1)
            this.dishesArray = dishes
            return dishes
        }).subscribe()
    }

    loadDishWithID(id: string) {
        this.dataStorageService.fetchDish(id).subscribe()
    }

    removeDish(dish: Dish) {
        this.dataStorageService.removeDish(dish._id).subscribe(this.loadDishes.bind(this))
    }

    addDish(dish: Dish) {
        this.dataStorageService.addDish(dish).subscribe(this.loadDishes.bind(this))
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

    private updateMinUnitPrice(dishes: Dish[]) {
        this.minDishPrice = Infinity
        for (let dish of dishes) {
            const dishPrice = +this.currencyService.calcDishReferencePrice(dish).toFixed(2)
            if (dishPrice < this.minDishPrice) this.minDishPrice = dishPrice
        }
    }

    private updateMaxUnitPrice(dishes: Dish[]) {
        this.maxDishPrice = 0
        for (let dish of dishes) {
            const dishPrice = +this.currencyService.calcDishReferencePrice(dish).toFixed(2)
            if (dishPrice > this.maxDishPrice) this.maxDishPrice = dishPrice
        }
    }
}
