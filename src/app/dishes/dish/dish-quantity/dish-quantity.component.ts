import { Component, Input, OnInit } from '@angular/core';
import { Dish } from 'src/app/shared/models/dish.model';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-dish-quantity',
  templateUrl: './dish-quantity.component.html'
})
export class DishQuantityComponent implements OnInit {
  @Input() dish!: Dish
  quantity: number = 0

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.orderService.updateDishQuantityEvent.subscribe(data => {
      this.updateQuantity(data.dish, data.quantity)
    })
  }

  updateQuantity(dish: Dish, quantity: number) {
    if (dish.id === this.dish.id) this.quantity = quantity || 0
  }
}
