import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './component/template/not-found/not-found.component';
import { LoginComponent } from './component/login/login.component';
import { ListfoodComponent } from './component/listfood/listfood.component';
import { MaterialComponent } from './component/material/material.component';
import { CategoryComponent } from './component/category/category.component';
import { ListCategoryComponent } from './component/category/list-category/listcategory.component';
import { ProductOfCategoryComponent } from './component/category/product-of-category/productofcategory.component';
import { DailyMenuComponent } from './component/dailymenu/dailymenu.component';
import { RegisterComponent } from './component/register/register.component';
import { BreadcrumbsComponent } from './component/template/breadcrumbs/breadcrumbs.component';
import { LoggedGuard } from './security/logged.guard';
import { NoLoggedGuard } from './security/no-logged.guard';
import { DetailFoodComponent } from './component/detail-food/detail-food.component';
import { HomeComponent } from './component/home/home.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'foods', component: ListfoodComponent },
  { path: 'materials', component: MaterialComponent },
  { path: 'categories', component: ListCategoryComponent, data: {
    breadcrumb: 'Categories'
  }
  },
  { path: 'category/:id', component: ProductOfCategoryComponent, data: {
    breadcrumb: 'Category'
  }
  },
  { path: 'login', component: LoginComponent, canActivate: [NoLoggedGuard], data: {
      breadcrumb: 'login'
    }
  },
  { path: 'register', component: RegisterComponent, data: {
       breadcrumb: 'register'
    }
  },
  { path: 'foods/detail',
    children: [
      { path: ':id', component: DetailFoodComponent}
    ],
  },
  { path: 'daily-menu', component: DailyMenuComponent, data: {
    breadcrumb: 'Daily menu'
    }
  },
  { path: 'account', component: NotFoundComponent, canActivate: [LoggedGuard] },
  { path: '**', component: NotFoundComponent },
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
