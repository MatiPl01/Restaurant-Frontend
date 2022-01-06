import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { CurrencyService } from 'src/app/services/currency.service';

@Component({
  selector: 'app-cart-summary',
  templateUrl: './cart-summary.component.html'
})
export class CartSummaryComponent implements OnInit {
  totalQuantity: number = 0
  totalPrice: number = 0

  constructor(private orderService: OrderService, 
              public currencyService: CurrencyService) {}

  ngOnInit(): void {
    this.orderService.updateTotalPriceEvent.subscribe((price: number) => this.totalPrice = price)
    this.orderService.updateTotalQuantityEvent.subscribe((quantity: number) => this.totalQuantity = quantity)
  }

}
