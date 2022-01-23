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
import { AuthGuard } from './guards/auth.guard'
import { RoleGuard } from './guards/role.guard'
import { AdminConsoleComponent } from './views/admin-console/admin-console.component'
import { ManagerConsoleComponent } from './views/manager-console/manager-console.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  { 
    path: 'cart', 
    component: CartComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ['client', 'manager', 'admin']
    },
  },
  { path: 'dishes', component: DishesComponent },
  {
    path: 'dishes/:id', 
    component: DishPageComponent, 
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ['client', 'manager', 'admin']
    },
    children: [
      { path: 'review', component: CreateReviewComponent}
  ] },
  { path: 'about', component: AboutComponent },
  { 
    path: 'add-dish', 
    component: AddDishComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ['manager', 'admin']
    },
  },
  { path: 'login', component: LoginPageComponent },
  {
    path: 'admin-console',
    component: AdminConsoleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ['admin']
    },
  },
  {
    path: 'manager-console',
    component: ManagerConsoleComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRoles: ['manager']
    },
  },
  { path: 'error', component: ErrorPageComponent } // TODO - disable manual entering
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
