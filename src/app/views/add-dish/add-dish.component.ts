import { Component } from '@angular/core'

import { AddedImage } from 'src/app/shared/schemas/others/added-image.schema'

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
