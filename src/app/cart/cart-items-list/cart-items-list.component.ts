import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';
import { Dish } from '../../shared/models/dish.model'

@Component({
  selector: 'app-cart-items-list',
  templateUrl: './cart-items-list.component.html'
})
export class CartItemsListComponent implements OnInit {
  cartDishes: Dish[] = []

  constructor(private orderService: OrderService) { }

  ngOnInit(): void {
    this.cartDishes = this.orderService.getCartDishes()

    this.orderService.updateCartContentsEvent.subscribe((dishes: Dish[]) => {
      this.cartDishes = dishes
    })
  }
}
