import { Component, Input, OnInit } from '@angular/core';
import { Review } from 'src/app/shared/models/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {
  @Input() reviews!: Review[]

  constructor() { }

  ngOnInit(): void {
  }

}
