import { Component, Input, OnInit } from '@angular/core';
import { ReviewsService } from 'src/app/services/reviews.service';
import { Review } from 'src/app/shared/models/review.model';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent implements OnInit {
  @Input() reviews!: Review[]

  constructor(private reviewsService: ReviewsService) { }

  ngOnInit(): void { // Save an opinion locally
    this.reviewsService.addedReviewEvent.subscribe((review: Review) => {
      this.reviews.push(review)
    })
  }
}
