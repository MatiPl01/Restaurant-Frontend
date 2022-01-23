import { Component, Input } from '@angular/core'

import { Review } from 'src/app/shared/models/db/review.model'

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html'
})
export class ReviewsComponent  {
  @Input() reviews!: Review[]
}
