import { Injectable, EventEmitter } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
    filtersChangedEvent = new EventEmitter<string>()

    private appliedFilters: any = {
        category: new Set(),
        cuisine: new Set(),
        unitPrice: {
            min: 0,
            max: Infinity
        },
        rating: {
            min: 0,
            max: Infinity
        }
    }

    private filtersFunctions: any = {
        category: (dish: Dish) => {
            return !this.appliedFilters.category.size || this.appliedFilters.category.has(dish.category)
        },
        cuisine: (dish: Dish) => {
            return !this.appliedFilters.cuisine.size || this.appliedFilters.cuisine.has(dish.cuisine)
        },
        unitPrice: (dish: Dish) => {
            const min = this.appliedFilters.unitPrice.min
            const max = this.appliedFilters.unitPrice.max
            return min <= dish.unitPrice && dish.unitPrice <= max
        },
        rating: (dish: Dish) => {
            const min = this.appliedFilters.rating.min
            const max = this.appliedFilters.rating.max
            return min <= dish.rating && dish.rating <= max
        }
    }

    addFilter(filterAttr: string, filterValue: any) {
        this.appliedFilters[filterAttr].add(filterValue)
        this.filtersChangedEvent.emit(filterAttr)
    }

    addAllFilters(filterAttr: string, filterValues: any) {
        this.appliedFilters[filterAttr] = new Set(filterValues)
        this.filtersChangedEvent.emit(filterAttr)
    }

    removeFilter(filterAttr: string, filterValue: any) {
        this.appliedFilters[filterAttr].delete(filterValue)
        this.filtersChangedEvent.emit(filterAttr)
    }

    removeAllFilters(filterAttr: string) {
        this.appliedFilters[filterAttr].clear()
        this.filtersChangedEvent.emit(filterAttr)
    }

    setRangeFilter(filterAttr: string, minValue: number, maxValue: number) {
        this.appliedFilters[filterAttr] = {
            min: minValue,
            max: maxValue
        }
        this.filtersChangedEvent.emit(filterAttr)
    }
    
    getFilters(filterAttr: string): any {
        return this.filtersFunctions[filterAttr]
    }

    resetFilters() {
        this.appliedFilters.category.clear()
        this.appliedFilters.cuisine.clear()
        this.appliedFilters.unitPrice.min = this.appliedFilters.rating.min = 0
        this.appliedFilters.unitPrice.max = this.appliedFilters.rating.max = Infinity
    }

    notifyRatingChanged() {
        this.filtersChangedEvent.emit('rating')
    }
}
