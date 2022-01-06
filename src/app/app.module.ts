import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'
import { NgxSliderModule } from '@angular-slider/ngx-slider'

import { AppComponent } from './app.component'
import { HomeComponent } from './home/home.component'
import { HeaderComponent } from './home/header/header.component'
import { FooterComponent } from './home/footer/footer.component'
import { NavBarComponent } from './nav-bar/nav-bar.component'
import { ParallaxDirective } from './directives/parallax.directive'
import { ParallaxSliderComponent } from './home/parallax-slider/parallax-slider.component'
import { ChooseCurrencyComponent } from './choose-currency/choose-currency.component'
import { DishesListComponent } from './dishes/dishes-list/dishes-list.component'
import { DishComponent } from './dishes/dish/dish.component'
import { DishesComponent } from './dishes/dishes.component'
import { PriceComponent } from './price/price.component'
import { ImgResponsiveComponent } from './img-responsive/img-responsive.component'
import { DishDetailsComponent } from './dishes/dish/dish-details/dish-details.component'
import { DishQuantityComponent } from './dishes/dish/dish-quantity/dish-quantity.component'
import { DishOrderComponent } from './dishes/dish/dish-order/dish-order.component'
import { RatingComponent } from './dishes/dish/dish-rating/dish-rating.component'
import { FiltersFormComponent } from './filters-form/filters-form.component'
import { FiltersSelectComponent } from './filters-form/filters-select/filters-select.component'
import { FiltersRangeComponent } from './filters-form/filters-range/filters-range.component'
import { CartComponent } from './cart/cart.component'
import { NotFoundComponent } from './not-found/not-found.component'
import { AboutComponent } from './about/about.component'
import { AddDishComponent } from './add-dish/add-dish.component'
import { AddDishFormComponent } from './add-dish/add-dish-form/add-dish-form.component'
import { ScrollTopBtnComponent } from './scroll-top-btn/scroll-top-btn.component'
import { FiltersPagesComponent } from './filters-form/filters-pages/filters-pages.component'
import { DishesPaginationComponent } from './dishes/dishes-pagination/dishes-pagination.component'

import { FiltersPipe } from '../app/pipes/filters.pipe'
import { PaginationPipe } from '../app/pipes/pagination.pipe'

import { AppRoutingModule } from './app-routing.module'
import { CartSummaryComponent } from './cart/cart-summary/cart-summary.component'
import { CartItemComponent } from './cart/cart-item/cart-item.component'
import { CartItemsListComponent } from './cart/cart-items-list/cart-items-list.component'


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    NavBarComponent,
    ParallaxDirective,
    ParallaxSliderComponent,
    ChooseCurrencyComponent,
    DishesComponent,
    DishesListComponent,
    DishComponent,
    DishDetailsComponent,
    DishOrderComponent,
    DishQuantityComponent,
    PriceComponent,
    ImgResponsiveComponent,
    RatingComponent,
    FiltersFormComponent,
    FiltersSelectComponent,
    FiltersRangeComponent,
    FiltersPipe,
    PaginationPipe,
    CartComponent,
    NotFoundComponent,
    AboutComponent,
    AddDishComponent,
    AddDishFormComponent,
    ScrollTopBtnComponent,
    FiltersPagesComponent,
    DishesPaginationComponent,
    CartSummaryComponent,
    CartItemComponent,
    CartItemsListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgMultiSelectDropDownModule.forRoot(),
    NgxSliderModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
