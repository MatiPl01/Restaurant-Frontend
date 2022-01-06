import { Component, OnInit } from '@angular/core'
import { PaginationService } from 'src/app/services/pagination.service'

@Component({
  selector: 'app-filters-pages',
  templateUrl: './filters-pages.component.html'
})
export class FiltersPagesComponent implements OnInit {
  possibleDishesPerPage: number[] = [2, 3, 6, 15, 30, 45] // TODO -change me to normal values
  dishesPerPage = this.possibleDishesPerPage[0]

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    const savedDishesPerPage = this.paginationService.getDataObject().dishesPerPage
    if (savedDishesPerPage === 1) this.paginationService.setDishesPerPageCount(+this.dishesPerPage)
    else this.dishesPerPage = savedDishesPerPage
  }

  onCountChange() {
    this.paginationService.setDishesPerPageCount(+this.dishesPerPage)
  }
}
