import { Injectable, EventEmitter } from '@angular/core'

@Injectable({
    providedIn: 'root'
})
export class PaginationService {
    pagesChanged = new EventEmitter<{ currentPageNum: number, dishesPerPage: number, pagesCount: number }>()

    pageIdx: number = 0
    pagesCount: number = 1
    dishesPerPage: number = 1
    prevDishesPerPage: number = 1
    displayedDishesCount: number = 1

    setDishesPerPageCount(count: number) {
        this.prevDishesPerPage = this.dishesPerPage
        this.dishesPerPage = count
        this.updatePagination()
        this.notifyChange()
    }

    setCurrentPage(pageNum: number) {
        this.pageIdx = pageNum - 1
        this.notifyChange()
    }

    updateDisplayedDishesCount(count: number) {
        this.displayedDishesCount = count
        this.updatePagination()
        this.notifyChange()
    }
   
    updatePagination() {
        const prevPagesDishesCount = Math.min(this.pageIdx * this.prevDishesPerPage, this.pagesCount)
        this.pageIdx = Math.floor(prevPagesDishesCount / this.dishesPerPage)
        this.pagesCount = Math.ceil(this.displayedDishesCount / this.dishesPerPage)
    }

    getDataObject() {
        return {
            currentPageNum: this.pageIdx + 1,
            dishesPerPage: this.dishesPerPage,
            pagesCount: this.pagesCount
        }
    }

    notifyChange() {
        this.pagesChanged.emit(this.getDataObject())
    }
}