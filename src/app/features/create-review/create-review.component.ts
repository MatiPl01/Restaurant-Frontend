import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html'
})
export class CreateReviewComponent {
  constructor(private location: Location) {}

  onClose(): void {
    this.location.back()
  }
}
