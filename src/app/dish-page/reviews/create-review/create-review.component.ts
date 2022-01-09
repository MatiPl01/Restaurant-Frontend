import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { ReviewsService } from 'src/app/services/reviews.service';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html'
})
export class CreateReviewComponent {
  ratingValue: number = 5

  constructor(private location: Location,
              private reviewsService: ReviewsService)  { }

  onClose(): void {
    this.location.back()
  }

  onSubmit(form: NgForm): void {
    this.reviewsService.addReview({
      username: form.value.username,
      title: form.value.title,
      body: form.value.body.split('\n').map((p: string) => p.trim()),
      date: form.value.date,
      rating: this.ratingValue
    })
    this.location.back()
  }

  onReset(): void {
    this.ratingValue = 5
    console.log(this.ratingValue)
  }

  getCurrentDate(): string {
    const currDate = new Date()
    const year = currDate.getFullYear()
    const month = (currDate.getMonth() + 1).toFixed().padStart(2, '0')
    const day = (currDate.getDate()).toFixed().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
