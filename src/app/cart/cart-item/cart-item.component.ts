import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/shared/models/dish.model';
import { CurrencyService } from 'src/app/services/currency.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-cart-item',
  templateUrl: './cart-item.component.html'
})
export class CartItemComponent implements OnInit {
  @Input() dish!: Dish
  quantity: number = 1

  constructor(public currencyService: CurrencyService,
              private orderService: OrderService) {}

  ngOnInit(): void {
    this.quantity = this.orderService.getQuantity(this.dish)
  }

  ngAfterViewChecked() {
    this.orderService.updateDishQuantityEvent.subscribe(data => {
      if (this.dish.id === data.dish.id) this.quantity = data.quantity
    })
  }

  onRemoveClick() {
    this.orderService.updateCart(this.dish, 0)
  }
}
