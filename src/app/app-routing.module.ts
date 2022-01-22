// BUILT-INS
import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'

// VIEWS
import { AboutComponent } from './views/about/about.component'
import { AddDishComponent } from './views/add-dish/add-dish.component'
import { CartComponent } from './views/cart/cart.component'
import { DishesComponent } from './views/dishes/dishes.component'
import { HomeComponent } from './views/home/home.component'
import { ErrorPageComponent } from './views/error-page/error-page.component'
import { DishPageComponent } from './views/dish-page/dish-page.component'
import { CreateReviewComponent } from './features/create-review/create-review.component'
import { LoginPageComponent } from './views/login-page/login-page.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'cart', component: CartComponent },
  { path: 'dishes', component: DishesComponent },
  { path: 'dishes/:id', component: DishPageComponent, children: [
    { path: 'review', component: CreateReviewComponent }
  ] },
  { path: 'about', component: AboutComponent },
  { path: 'add-dish', component: AddDishComponent },
  { path: 'login', component: LoginPageComponent },
  { path: '**', component: ErrorPageComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
