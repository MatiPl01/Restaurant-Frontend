import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { Dish } from 'src/app/shared/models/db/dish.model'

import { CurrencyService } from 'src/app/services/currency.service'
import { OrderService } from 'src/app/services/order.service'

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent implements OnInit, OnDestroy {
  @Input() dish!: Dish
  quantity: number = 1
  subscription!: Subscription

  constructor(public currencyService: CurrencyService,
              private orderService: OrderService) {}

  ngOnInit(): void {
    this.quantity = this.orderService.getQuantity(this.dish)
  }

  ngAfterViewChecked() {
    if (this.subscription) return
    this.subscription = this.orderService.updateDishQuantityEvent.subscribe(data => {
      if (this.dish._id === data.dish._id) this.quantity = data.quantity
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  onRemoveClick() {
    this.orderService.updateCart(this.dish, 0)
  }
}
