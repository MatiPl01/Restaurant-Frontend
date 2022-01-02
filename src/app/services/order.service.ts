import { Injectable, EventEmitter } from '@angular/core'
import { CurrencyService } from './currency.service'

import { Dish } from 'src/app/shared/models/dish.model'
import { DishesService } from './dishes.service'

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    openBasketEvent = new EventEmitter<void>()
    updateBasketContentsEvent = new EventEmitter<Dish[]>()
    updateDishQuantityEvent = new EventEmitter<{ dish: Dish, quantity: number }>()
    updateTotalQuantityEvent = new EventEmitter<number>()
    updateTotalPriceEvent = new EventEmitter<number>()
    totalQuantity: number = 0
    totalPrice: number = 0
    private basket: Map<Dish, number> = new Map()

    constructor(private currencyService: CurrencyService, private dishesService: DishesService) { }

    updateBasket(dish: Dish, quantity: number) {
        const deltaQuantity = quantity - (this.basket.get(dish) || 0)
        this.totalQuantity += deltaQuantity
        this.totalPrice += this.currencyService.exchangeAmount(dish.unitPrice, dish.currency, this.currencyService.getReferenceCurrency())
        if (quantity === 0) this.basket.delete(dish)
        else this.basket.set(dish, quantity)

        this.updateBasketContentsEvent.emit([...this.basket.keys()])
        this.updateTotalQuantityEvent.emit(this.totalQuantity)
        this.updateDishQuantityEvent.emit({ dish, quantity })
        this.updateTotalPriceEvent.emit(this.totalPrice)
    }

    onBtnCartClick() {
        this.openBasketEvent.emit()
    }

    getQuantity(dish: Dish): number {
        return this.basket.get(dish) || 0
    }
}
