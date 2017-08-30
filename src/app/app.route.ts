import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './component/template/not-found/not-found.component';
import { LoginComponent } from './component/login/login.component';
import { BreadcrumbsComponent } from './component/template/breadcrumbs/breadcrumbs.component';
import { LoggedGuard } from './security/logged.guard';
import { NoLoggedGuard } from './security/no-logged.guard';

const appRoutes: Routes = [
  { path: 'home', component: BreadcrumbsComponent},
  { path: 'login', component: LoginComponent, canActivate: [NoLoggedGuard]},
  { path: 'account', component: NotFoundComponent, canActivate: [LoggedGuard]},
  { path: '**', component: NotFoundComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
