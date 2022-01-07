import { Injectable, EventEmitter } from '@angular/core'
import { Dish } from 'src/app/shared/models/dish.model'

type FiltersObject = {
    category: Set<string>,
    cuisine: Set<string>,
    unitPrice: {
        min: number,
        max: number
    },
    rating: {
        min: number,
        max: number
    }
}

@Injectable({
  providedIn: 'root'
})
export class FiltersService {
    filtersChangedEvent = new EventEmitter<FiltersObject>()

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
        this.notifyChanges()
    }

    addAllFilters(filterAttr: string, filterValues: any) {
        this.appliedFilters[filterAttr] = new Set(filterValues)
        this.notifyChanges()
    }

    removeFilter(filterAttr: string, filterValue: any) {
        this.appliedFilters[filterAttr].delete(filterValue)
        this.notifyChanges()
    }

    removeAllFilters(filterAttr: string) {
        this.appliedFilters[filterAttr].clear()
        this.notifyChanges()
    }

    setRangeFilter(filterAttr: string, minValue: number, maxValue: number) {
        this.appliedFilters[filterAttr] = {
            min: minValue,
            max: maxValue
        }
        this.notifyChanges()
    }
    
    getFilters(filterAttr: string): any {
        return this.filtersFunctions[filterAttr]
    }

    resetFilters(notifyChanges: boolean = true) {
        this.appliedFilters.category.clear()
        this.appliedFilters.cuisine.clear()
        this.appliedFilters.unitPrice.min = this.appliedFilters.rating.min = 0
        this.appliedFilters.unitPrice.max = this.appliedFilters.rating.max = Infinity
        if (notifyChanges) this.notifyChanges()
    }

    notifyChanges() {
        this.filtersChangedEvent.emit(this.appliedFilters)
    }
}
