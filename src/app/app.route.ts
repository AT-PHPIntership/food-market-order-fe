import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './component/template/not-found/not-found.component';
import { LoginComponent } from './component/login/login.component';
import { CategoryComponent } from './component/category/category.component';
import { ListfoodComponent } from './component/listfood/listfood.component';
import { DailyMenuComponent } from './component/dailymenu/dailymenu.component';
import { RegisterComponent } from './component/register/register.component';
import { LoggedGuard } from './security/logged.guard';
import { NoLoggedGuard } from './security/no-logged.guard';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';

const appRoutes: Routes = [
  { path: 'home', component: CategoryComponent },
  { path: 'foods', component: ListfoodComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoLoggedGuard], data: {
      breadcrumb: 'login'
    }
  },
  { path: 'register', component: RegisterComponent, data: {
    breadcrumb: 'register'
    }
  },
  { path: 'daily-menu', component: DailyMenuComponent, data: {
    breadcrumb: 'Daily menu'
  } },
  { path: 'account', component: NotFoundComponent, canActivate: [LoggedGuard] },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart List', breadcrumb: 'cart'},
  },
  {
    path: 'checkout/foods',
    component: OrderComponent,
    data: { title: 'order'},
    canActivate: [LoggedGuard]
  },
  {
    path: 'checkout/materials',
    component: OrderComponent,
    data: { title: 'order'},
    canActivate: [LoggedGuard]
  },
  { path: '**', component: NotFoundComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
