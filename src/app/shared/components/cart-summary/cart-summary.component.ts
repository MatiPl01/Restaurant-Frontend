import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'

import { OrderService } from 'src/app/services/order.service'
import { CurrencyService } from 'src/app/services/currency.service'

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent implements OnInit, OnDestroy {
  totalQuantity: number = 0
  totalPrice: number = 0
  subscriptions: Subscription[] = []

  constructor(private orderService: OrderService, 
              public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.subscriptions = []
    this.totalPrice = this.orderService.totalPrice
    this.totalQuantity = this.orderService.totalQuantity

    this.subscriptions.push(
      this.orderService.updateTotalPriceEvent.subscribe((price: number) => this.totalPrice = price), 
      this.orderService.updateTotalQuantityEvent.subscribe((quantity: number) => this.totalQuantity = quantity)
    )
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  onOrderBtnClick(): void {
    this.orderService.placeOrder()
  }
}
