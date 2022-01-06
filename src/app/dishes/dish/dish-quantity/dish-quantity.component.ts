import { Component, Input, OnInit, OnDestroy } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'
import { OrderService } from 'src/app/services/order.service'
import { Subscription } from 'rxjs'

@Component({
  selector: 'app-dish-quantity',
  templateUrl: './dish-quantity.component.html'
})
export class DishQuantityComponent implements OnInit, OnDestroy {
  @Input() dish!: Dish
  quantity: number = 0
  subscription!: Subscription

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.subscription = this.orderService.updateDishQuantityEvent.subscribe(data => {
      this.updateQuantity(data.dish, data.quantity)
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  private updateQuantity(dish: Dish, quantity: number) {
    if (dish.id === this.dish.id) this.quantity = quantity || 0
  }
}
