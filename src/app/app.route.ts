import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './component/template/not-found/not-found.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { BreadcrumbsComponent } from './component/template/breadcrumbs/breadcrumbs.component';
import { LoggedGuard } from './security/logged.guard';
import { NoLoggedGuard } from './security/no-logged.guard';
import { CartComponent } from './component/cart/cart.component';

const appRoutes: Routes = [
  { path: 'home', component: BreadcrumbsComponent },
  { path: 'login', component: LoginComponent, canActivate: [NoLoggedGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'account', component: NotFoundComponent, canActivate: [LoggedGuard] },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'Cart List'},
  },
  { path: '**', component: NotFoundComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
