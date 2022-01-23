import { Injectable, EventEmitter } from '@angular/core'
import { CurrencyService } from './currency.service'

import { Dish } from 'src/app/shared/models/db/dish.model'
import { DataStorageService } from './data-storage.service'
import { Cart } from '../shared/schemas/others/cart.schema'
import { Order } from '../shared/models/db/order.model'

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    updateCartContentsEvent = new EventEmitter<Dish[]>()
    updateDishQuantityEvent = new EventEmitter<{ dish: Dish, quantity: number }>()
    updateTotalQuantityEvent = new EventEmitter<number>()
    updateTotalPriceEvent = new EventEmitter<number>()
    totalQuantity: number = 0
    totalPrice: number = 0
    private cart: Map<Dish, number> = new Map()

    constructor(private currencyService: CurrencyService,
                private dataStorageService: DataStorageService) {}

    updateCart(dish: Dish, quantity: number): void {
        const deltaQuantity = quantity - (this.cart.get(dish) || 0)

        if (deltaQuantity === 0) return

        this.totalQuantity += deltaQuantity
        this.totalPrice += deltaQuantity * this.currencyService.exchangeAmount(dish.unitPrice, dish.currency, this.currencyService.getReferenceCurrency())
        if (quantity === 0) this.cart.delete(dish)
        else this.cart.set(dish, quantity)

        this.emitEvents()
        this.updateDishQuantityEvent.emit({ dish, quantity })

        this.updateDBCart()
    }

    emitEvents(): void {
        this.updateCartContentsEvent.emit(this.getCartDishes())
        this.updateTotalQuantityEvent.emit(this.totalQuantity)
        this.updateTotalPriceEvent.emit(this.totalPrice)
    }
    
    getQuantity(dish: Dish): number {
        return this.cart.get(dish) || 0
    }
    
    getCartDishes(): Dish[] {
        return [...this.cart.keys()]
    }
    
    loadUserCart(): void {
        this.dataStorageService.fetchCart((data: any) => {
            data.forEach((item: any) => {
                this.dataStorageService.fetchDish(item.dish).subscribe((res: any) => {
                    const dish = res.data
                    this.updateCart(dish, item.quantity)
                })
            })
        }).subscribe()
    }

    placeOrder(): void {
        this.dataStorageService.addOrder(this.getOrderJSON()).subscribe()
        this.resetCart()
        this.updateDBCart()
    }

    private resetCart(): void {
        this.cart.clear()
        this.totalPrice = this.totalQuantity = 0
        this.emitEvents()
    }

    private updateDBCart(): void {
        this.dataStorageService.updateCart(this.getCartJSON()).subscribe()
    }

    private getCartJSON(): Cart {
        const result: Cart = { cart: [] }

        for (let dish of this.cart.keys()) {
            result.cart.push({
                dish: dish._id,
                // @ts-ignore
                quantity: this.cart.get(dish)
            })
        }

        return result
    }

    private getOrderJSON(): Order {
        return {
            // @ts-ignore
            dishes: [...this.cart.keys()].map((dish: Dish) => {
                return {
                    dish: dish._id,
                    quantity: this.cart.get(dish)
                }
            }),
            currency: this.currencyService.currentCurrency,
            amount: this.currencyService.fromReferenceToCurrent(this.totalPrice)
        }
    }
}
