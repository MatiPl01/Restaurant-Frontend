import { Component } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Router, ActivatedRoute } from '@angular/router'

import { ReviewsService } from 'src/app/services/reviews.service'
import { User } from '../../models/db/user.model'
import { ReviewSchema } from '../../schemas/db/review.schema'

@Component({
  selector: 'app-review-form',
  templateUrl: './review-form.component.html'
})
export class ReviewFormComponent {
  ratingValue: number = 5
  dishID: string

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private reviewsService: ReviewsService) {
    // @ts-ignore
    this.dishID = this.activatedRoute.parent?.snapshot.params['id']
  }

  onSubmit(form: NgForm): void {
    const review: ReviewSchema = {
      // @ts-ignore TODO - remove this ignore
      user: null, // TODO - get user which is currently logged in
      title: form.value.title,
      body: form.value.body.split('\n').map((p: string) => p.trim()),
      date: form.value.date,
      rating: this.ratingValue
    }
    this.reviewsService.addReview(this.dishID, review)
    this.router.navigate(['..'], { relativeTo: this.activatedRoute })
  }

  onReset(): void {
    this.ratingValue = 5
  }

  getCurrentDate(): string {
    const currDate = new Date()
    const year = currDate.getFullYear()
    const month = (currDate.getMonth() + 1).toFixed().padStart(2, '0')
    const day = (currDate.getDate()).toFixed().padStart(2, '0')
    return `${year}-${month}-${day}`
  }
}
