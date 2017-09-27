import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from './component/template/not-found/not-found.component';
import { LoginComponent } from './component/login/login.component';
import { ListfoodComponent } from './component/listfood/listfood.component';
import { MaterialComponent } from './component/material/material.component';
import { ListCategoryComponent } from './component/category/list-category/listcategory.component';
import { ProductOfCategoryComponent } from './component/category/product-of-category/productofcategory.component';
import { DailyMenuComponent } from './component/dailymenu/dailymenu.component';
import { RegisterComponent } from './component/register/register.component';
import { LoggedGuard } from './security/logged.guard';
import { NoLoggedGuard } from './security/no-logged.guard';
import { UserProfileComponent} from './component/userprofile/userprofile.component';
import { DetailFoodComponent } from './component/detail-food/detail-food.component';
import { HomeComponent } from './component/home/home.component';
import { CartComponent } from './component/cart/cart.component';
import { OrderComponent } from './component/order/order.component';
import { OrderDetailComponent } from './component/account/orderDetail/orderDetail.component';
import { DetailMaterialComponent } from './component/detail-material/detail-material.component';

const appRoutes: Routes = [
  { path: 'account', component: UserProfileComponent, canActivate: [LoggedGuard]},
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
  {path: 'order/:id', component: OrderDetailComponent, data: {}, canActivate: [LoggedGuard]},
  { path: 'register', component: RegisterComponent, data: {
      breadcrumb: 'register'
    }
  },
  { path: 'foods/detail',
    children: [
      { path: ':id', component: DetailFoodComponent}
    ],
  },
  { path: 'materials/detail',
    children: [
      { path: ':id', component: DetailMaterialComponent}
    ],
  },
  { path: 'daily-menu', component: DailyMenuComponent, data: {
    breadcrumb: 'Daily menu'
    }
  },
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
