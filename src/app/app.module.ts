// BUILT-INS
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

// VENDORS
import { NgxSliderModule } from '@angular-slider/ngx-slider'
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown'

// ROUTING
import { AppRoutingModule } from './app-routing.module'

// DIRECTIVES
import { ParallaxDirective } from './directives/parallax.directive'

// PIPES
import { FiltersPipe } from './pipes/filters.pipe'
import { PaginationPipe } from './pipes/pagination.pipe'

// COMPONENTS
  // Main app component
import { AppComponent } from './app.component'

  // Core components
import { FooterComponent } from './core/footer/footer.component'
import { HeaderComponent } from './core/header/header.component'
import { NavBarComponent } from './core/nav-bar/nav-bar.component'

  // Views components
import { AboutComponent } from './views/about/about.component'
import { AddDishComponent } from './views/add-dish/add-dish.component'
import { CartComponent } from './views/cart/cart.component'
import { DishPageComponent } from './views/dish-page/dish-page.component'
import { DishesComponent } from './views/dishes/dishes.component'
import { HomeComponent } from './views/home/home.component'
import { ErrorPageComponent } from './views/error-page/error-page.component'

  // Features components
import { CreateReviewComponent } from './features/create-review/create-review.component'
import { DishesFiltersComponent } from './features/dishes-filters/dishes-filters.component'

  // Shared components
import { AddDishFormComponent } from './shared/components/add-dish-form/add-dish-form.component'
import { AddedImagesComponent } from './shared/components/added-images/added-images.component'
import { CartItemComponent } from './shared/components/cart-item/cart-item.component'
import { CartItemsListComponent } from './shared/components/cart-items-list/cart-items-list.component'
import { CartSummaryComponent } from './shared/components/cart-summary/cart-summary.component'
import { ChooseCurrencyComponent } from './shared/components/choose-currency/choose-currency.component'
import { DishComponent } from './shared/components/dish-card/dish.component'
import { DishDetailsComponent } from './shared/components/dish-details/dish-details.component'
import { DishOrderComponent } from './shared/components/dish-order/dish-order.component'
import { DishQuantityComponent } from './shared/components/dish-quantity/dish-quantity.component'
import { DishesListComponent } from './shared/components/dishes-list/dishes-list.component'
import { DishesPaginationComponent } from './shared/components/dishes-pagination/dishes-pagination.component'
import { FiltersPagesComponent } from './shared/components/filters-pages/filters-pages.component'
import { FiltersRangeComponent } from './shared/components/filters-range/filters-range.component'
import { FiltersSelectComponent } from './shared/components/filters-select/filters-select.component'
import { GallerySliderComponent } from './shared/components/gallery-slider/gallery-slider.component'
import { ParallaxSliderComponent } from './shared/components/parallax-slider/parallax-slider.component'
import { PopupComponent } from './shared/components/popup/popup.component'
import { PriceComponent } from './shared/components/price/price.component'
import { RatingComponent } from './shared/components/rating/rating.component'
import { ResponsiveGalleryComponent } from './shared/components/responsive-gallery/responsive-gallery.component'
import { ResponsiveImageComponent } from './shared/components/responsive-image/responsive-image.component'
import { ReviewComponent } from './shared/components/review/review.component'
import { ReviewFormComponent } from './shared/components/review-form/review-form.component'
import { ReviewsComponent } from './shared/components/reviews/reviews.component'
import { ScrollTopBtnComponent } from './shared/components/scroll-top-btn/scroll-top-btn.component';
import { LoginPageComponent } from './views/login-page/login-page.component';
import { LoginFormComponent } from './shared/components/login-form/login-form.component';
import { RegistrationFormComponent } from './shared/components/registration-form/registration-form.component'

@NgModule({
  declarations: [
    // Directives
    ParallaxDirective,

    // Pipes
    FiltersPipe,
    PaginationPipe,

    // Components
    AppComponent,
    AppComponent,
    FooterComponent,
    HeaderComponent,
    NavBarComponent,
    AboutComponent,
    AddDishComponent,
    CartComponent,
    DishPageComponent,
    DishesComponent,
    HomeComponent,
    ErrorPageComponent,
    CreateReviewComponent,
    DishesFiltersComponent,
    AddDishFormComponent,
    AddedImagesComponent,
    CartItemComponent,
    CartItemsListComponent,
    CartSummaryComponent,
    ChooseCurrencyComponent,
    DishComponent,
    DishDetailsComponent,
    DishOrderComponent,
    DishQuantityComponent,
    DishesListComponent,
    DishesPaginationComponent,
    FiltersPagesComponent,
    FiltersRangeComponent,
    FiltersSelectComponent,
    GallerySliderComponent,
    ParallaxSliderComponent,
    PopupComponent,
    PriceComponent,
    RatingComponent,
    ResponsiveGalleryComponent,
    ResponsiveImageComponent,
    ReviewComponent,
    ReviewFormComponent,
    ReviewsComponent,
    ScrollTopBtnComponent,
    LoginPageComponent,
    LoginFormComponent,
    RegistrationFormComponent
  ],
  imports: [
    // BUILT-INS
    BrowserModule,
    HttpClientModule,
    FormsModule,

    // VENDORS
    NgMultiSelectDropDownModule.forRoot(),
    NgxSliderModule,
    
    // ROUTING
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
