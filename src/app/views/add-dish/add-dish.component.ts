import { Component } from '@angular/core'

import { AddedImage } from 'src/app/shared/models/added-image.model'

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html'
})
export class AddDishComponent {
  images: AddedImage[] = []

  onImagesChange(images: AddedImage[]) {
    this.images = images
  }
}
