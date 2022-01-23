import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-review',
  templateUrl: './create-review.component.html'
})
export class CreateReviewComponent {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) {}

  onClose(): void {
    this.router.navigate(['..'], { relativeTo: this.activatedRoute })
  }
}
