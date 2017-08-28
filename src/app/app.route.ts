import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './component/template/not-found/not-found.component';
import {LoginComponent} from './component/login/login.component';
import NoLoggedGuard from './security/no-logged-guard';
import ActivateGuard from './security/logged-guard';
import {BreadcrumbsComponent} from './component/template/breadcrumbs/breadcrumbs.component';
const appRoutes: Routes = [
  { path: 'home', component: BreadcrumbsComponent},
  { path: 'login', component: LoginComponent, canActivate: [NoLoggedGuard]},
  { path: 'account', component: NotFoundComponent, canActivate: [ActivateGuard]},
  { path: '**', component: NotFoundComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
