import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DishesService } from '../services/dishes.service';
import { PaginationService } from '../services/pagination.service';
import { Dish } from '../shared/models/dish.model';

@Component({
  selector: 'app-dish-page',
  templateUrl: './dish-page.component.html'
})
export class DishPageComponent implements OnInit, OnDestroy {
  dish!: Dish
  dishID!: number
  subscriptions: Subscription[] = []

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private dishesService: DishesService,
              public paginationService: PaginationService) {}

  ngOnInit(): void {
    this.dishID = this.activatedRoute.snapshot.params['id']
    this.loadDishData()

    this.subscriptions.push(
      this.dishesService.dishesChangedEvent.subscribe(this.loadDishData.bind(this))
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  getImagesAlts(): string[] {
    return new Array(this.dish.images.gallery.length).fill('').map(_ => this.dish.name)
  }

  private loadDishData(): void {
    this.dish = this.dishesService.getDishWithID(+this.dishID)
  }
}
