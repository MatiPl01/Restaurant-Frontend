import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { Dish } from 'src/app/shared/models/dish.model'

import { OrderService } from 'src/app/services/order.service'

@Component({
  selector: 'app-cart-items-list',
  templateUrl: './cart-items-list.component.html'
})
export class CartItemsListComponent implements OnInit, OnDestroy {
  cartDishes: Dish[] = []
  subscription!: Subscription

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.cartDishes = this.orderService.getCartDishes()

    this.subscription = this.orderService.updateCartContentsEvent.subscribe((dishes: Dish[]) => {
      this.cartDishes = dishes
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
