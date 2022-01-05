import { Component, Input, OnInit } from '@angular/core'
import { PaginationService } from '../../services/pagination.service'


@Component({
  selector: 'app-dishes-pagination',
  templateUrl: './dishes-pagination.component.html'
})
export class DishesPaginationComponent implements OnInit {
  pagesCount: number = 1
  currentPage: number = 1
  @Input('maxDisplayed') maxDisplayedNumbersCount: number = 5

  pagesNumbers: number[] = []

  constructor(private paginationService: PaginationService) {}

  ngOnInit() {
    this.update(this.paginationService.getDataObject())
    this.paginationService.pagesChanged.subscribe(this.update.bind(this))
  }

  updateMiddlePagesNumbers() {
    if (this.pagesCount < 3) this.pagesNumbers = []
    const middleCount = this.maxDisplayedNumbersCount - 2
    let startNum = this.currentPage - Math.floor(middleCount / 2)
    let endNum = startNum + middleCount - 1
    const lastPossible = this.pagesCount - 1

    if (startNum < 2) {
      endNum = Math.min(endNum + (2 - startNum), lastPossible)
      startNum = 2
    } else if (endNum > lastPossible) {
      startNum = Math.max(2, startNum - (endNum - lastPossible))
      endNum = lastPossible
    }

    const arr = []
    for (let i = startNum; i <= endNum; i++) arr.push(i)
    this.pagesNumbers = arr
  }

  changeCurrentPage(clickedPageNum: number) {
    this.paginationService.setCurrentPage(clickedPageNum)
  }

  update(data: any) {
    this.pagesCount = data.pagesCount
    this.currentPage = data.currentPageNum
    this.updateMiddlePagesNumbers()
  }
}
