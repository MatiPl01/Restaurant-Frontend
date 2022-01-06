import { Component, OnInit } from '@angular/core';
import { OrderService } from '../services/order.service';
import { Dish } from '../shared/models/dish.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html'
})
export class CartComponent implements OnInit {


  constructor() {}

  ngOnInit(): void {
    
  }
}
