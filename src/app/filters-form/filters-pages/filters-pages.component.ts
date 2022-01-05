import { Component, OnInit } from '@angular/core';
import { PaginationService } from 'src/app/services/pagination.service';

@Component({
  selector: 'app-filters-pages',
  templateUrl: './filters-pages.component.html'
})
export class FiltersPagesComponent implements OnInit {
  possibleDishesPerPage: number[] = [1, 2, 3, 6, 15, 30, 45] // TODO -change me to a normal value
  dishesPerPage = this.possibleDishesPerPage[0]

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.paginationService.setDishesPerPageCount(+this.dishesPerPage)
  }

  onCountChange() {
    this.paginationService.setDishesPerPageCount(+this.dishesPerPage)
  }
}
