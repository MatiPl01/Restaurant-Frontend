import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-review-create',
  templateUrl: './review-create.component.html'
})
export class ReviewCreateComponent  {
  constructor(private location: Location) {}

  onClose(): void {
    this.location.back()
  }
}
