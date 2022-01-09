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

  getRemainingText(): string {
    const lastDigit = (this.dish.stock - this.quantity) % 10
    if (lastDigit === 0 || 5 <= lastDigit && lastDigit <= 9 || lastDigit === 1 && this.dish.ratesCount > 10 || this.dish.ratesCount >= 10 && this.dish.ratesCount <= 21) return 'Pozostało'
    if (lastDigit === 1) return 'Pozostała'
    return 'Pozostały'
  }

  private updateQuantity(dish: Dish, quantity: number) {
    if (dish._id === this.dish._id) this.quantity = quantity || 0
  }
}
