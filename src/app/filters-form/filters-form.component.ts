import { Component, OnDestroy, OnInit } from '@angular/core'
import { DishesService } from '../services/dishes.service'
import { FiltersService } from '../services/filters.service'
import { CurrencyService } from '../services/currency.service'
import { LabelType, Options } from '@angular-slider/ngx-slider'
import { Subscription } from 'rxjs'

type dropdownEventObj = { filterAttr: string, value: any }

@Component({
  selector: 'app-filters-form',
  templateUrl: './filters-form.component.html'
})
export class FiltersFormComponent implements OnInit, OnDestroy {
  categoryFilterAttr: string = 'category'
  cuisineFilterAttr:  string = 'cuisine'
  priceFilterAttr: string = 'unitPrice'
  ratingFilterAttr:  string = 'rating'
  priceStep = .5
  ratingStep = .05
  categoriesList: string[] = []
  cuisinesList: string[] = []
  priceSteps: number = 0
  ratingSteps: number = 0
  minPrice: number = 0
  maxPrice: number = 0
  minRating: number = 0
  maxRating: number = 0
  
  settings = {
    idField: 'filterID',
    textField: 'filterValue',
    allowSearchFilter: true,
    singleSelection: false,
    enableCheckAll: true,
    itemsShowLimit: 2,
    selectAllText: 'Zaznacz wszystkie',
    unSelectAllText: 'Odznacz wszystkie',
  }

  placeholderOptions: Options = {
    floor: 0,
    ceil: 0
  }

  priceOptions:  Options = Object.assign({}, this.placeholderOptions)
  ratingOptions: Options = Object.assign({}, this.placeholderOptions)

  subscriptions: Subscription[] = []

  constructor(private filtersService: FiltersService, private dishesService: DishesService, private currencyService: CurrencyService) { }

  ngOnInit(): void {
    this.update()

    this.subscriptions.push(
      this.dishesService.dishesChangedEvent.subscribe(this.update.bind(this)),
      this.currencyService.currencyChangedEvent.subscribe(() => {
        this.updatePriceSlider()
      })
    )
  }

  ngOnDestroy() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
  }

  getDropdownList(filterAttr: string) {
    return [...this.dishesService.getValuesSet(filterAttr)]
  }

  onItemSelected(eventObj: dropdownEventObj) {
    this.filtersService.addFilter(eventObj.filterAttr, eventObj.value);
  }

  onItemDeSelected(eventObj: dropdownEventObj) {
    this.filtersService.removeFilter(eventObj.filterAttr, eventObj.value)
  }

  onSelectedAll(eventObj: dropdownEventObj) {
    this.filtersService.addAllFilters(eventObj.filterAttr, eventObj.value)
  }

  onDeSelectedAll(eventObj: dropdownEventObj) {
    this.filtersService.removeAllFilters(eventObj.filterAttr)
  }

  onRangeChanged(eventObj: {filterAttr: string, min: number, max: number}) {
    let min, max
    if (eventObj.filterAttr === this.priceFilterAttr) {
      // Convert to the reference currency
      min = this.currencyService.fromCurrentToReference(this.stepToValue(eventObj.min, this.priceSteps, this.minPrice, this.maxPrice))
      max = this.currencyService.fromCurrentToReference(this.stepToValue(eventObj.max, this.priceSteps, this.minPrice, this.maxPrice))
    } else {
      min = this.stepToValue(eventObj.min, this.ratingSteps, this.minRating, this.maxRating)
      max = this.stepToValue(eventObj.max, this.ratingSteps, this.minRating, this.maxRating)
    }
    
    this.filtersService.setRangeFilter(eventObj.filterAttr, min, max);
  }

  private updatePriceOptions() {
    const currency = this.currencyService.getCurrentCurrencySymbol();
    this.priceOptions = {
      floor: 0,
      ceil: this.priceSteps,
      translate: (value: number, label: LabelType): string => {
        value = this.stepToValue(value, this.priceSteps, this.minPrice, this.maxPrice)
        return value ? currency + value.toFixed(2) : ''
      }
    }
  }

  private updateRatingOptions() {
    this.ratingOptions = {
      floor: 0,
      ceil: this.ratingSteps,
      translate: (value: number, label: LabelType): string => {
        value = this.stepToValue(value, this.ratingSteps, this.minRating, this.maxRating)
        return value ? value.toFixed(2) : ''
      }
    }
  }

  private calcStepsCount(min: number, max: number, step: number): number {
    return +Math.ceil((max - min) / step).toFixed()
  }

  private stepToValue(step: number, steps: number, min: number, max: number): number {
    return min + (max - min) / steps * step
  }

  private updatePriceSlider() {
    this.minPrice = Math.floor(this.currencyService.fromReferenceToCurrent(this.dishesService.getMinReferencePrice()))
    this.maxPrice = Math.ceil(this.currencyService.fromReferenceToCurrent(this.dishesService.getMaxReferencePrice()))
    this.priceSteps = this.calcStepsCount(this.minPrice, this.maxPrice, this.priceStep)
    this.updatePriceOptions()
  }

  private updateRatingsSlider() {
    const ratings = this.dishesService.getValuesSet('rating')
    this.minRating = Math.floor(Math.min(...ratings))
    this.maxRating = Math.ceil(Math.max(...ratings))
    this.ratingSteps = this.calcStepsCount(this.minRating, this.maxRating, this.ratingStep)
    this.updateRatingOptions()
  }

  private update() {
    this.categoriesList = [...this.dishesService.getValuesSet(this.categoryFilterAttr)]
    this.cuisinesList = [...this.dishesService.getValuesSet(this.cuisineFilterAttr)]
    this.updatePriceSlider()
    this.updateRatingsSlider()
  }
}
