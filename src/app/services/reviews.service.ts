import { Injectable, EventEmitter } from '@angular/core'
import { Review } from '../shared/models/review.model';

@Injectable({
    providedIn: 'root'
})
export class ReviewsService {
    addedReviewEvent = new EventEmitter<Review>()

    addReview(review: Review): void {
        this.addedReviewEvent.emit(review)
    }
}
