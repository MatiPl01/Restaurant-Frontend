import { Component, EventEmitter, Input, OnInit, Output, ElementRef } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html'
})
export class RatingComponent implements OnInit {
  @Input() allowUserRating: boolean = false
  @Input('value') currentRating: number = 0
  @Output() ratingChangedEvent = new EventEmitter<number>()
  hasUserRated: boolean = false // Indicates if an user left their own rating

  constructor(private elRef: ElementRef) { }

  ngOnInit(): void {
    this.displayRating()
  }

  onRatingChange(event: Event) {
    if (this.allowUserRating) {
      this.hasUserRated = true
      this.currentRating = parseInt((<HTMLInputElement>event.target).value) / 2
      this.ratingChangedEvent.emit(this.currentRating)
      this.displayRating()
    }
  }

  private displayRating() {
    const segmentsCount = +(2 * this.currentRating).toFixed()
    if (segmentsCount > 0) {
      this.elRef.nativeElement.querySelector(`.rating__radio[value="${segmentsCount}"]`).checked = true
    }
  }
}
