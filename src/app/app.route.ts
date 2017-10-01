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
import { AboutComponent } from './component/about/about.component';
import { MainSearchComponent } from './component/search/search.component';

const appRoutes: Routes = [
  { path: 'account', component: UserProfileComponent, canActivate: [LoggedGuard], data: {
      breadcrumb: 'account_page',
      title: 'account_page'
    }
  },
  { path: 'home', component: HomeComponent, data: {
      breadcrumb: '',
      title: ''
    }
  },
  { path: '', component: HomeComponent, data: {
      breadcrumb: '',
      title: ''
    }
  },
  { path: 'foods', component: ListfoodComponent, data: {
      breadcrumb: 'categories_food',
      title: 'categories_food'
    }
  },
  { path: 'materials', component: MaterialComponent, data: {
      breadcrumb: 'categories_material',
      title: 'categories_material'
    }
  },
  { path: 'categories', component: ListCategoryComponent, data: {
      breadcrumb: 'category',
      title: 'category'
    }
  },
  { path: 'category/:id', component: ProductOfCategoryComponent, data: {
      breadcrumb: 'category',
      title: 'category'
    }
  },
  { path: 'login', component: LoginComponent, canActivate: [NoLoggedGuard], data: {
      breadcrumb: 'login',
      title: 'login'
    }
  },
  {path: 'order/:id', component: OrderDetailComponent, data: {
      breadcrumb: 'order',
      title: 'order'
    }, canActivate: [LoggedGuard]
  },
  { path: 'register', component: RegisterComponent, data: {
      breadcrumb: 'register',
      title: 'register'
    }
  },
  { path: 'foods/detail',
    children: [
      { path: ':id', component: DetailFoodComponent, data: {
          breadcrumb: 'detail-page',
          title: 'detail-page'
        }
      }
    ],
  },
  { path: 'materials/detail',
    children: [
      { path: ':id', component: DetailMaterialComponent, data: {
          breadcrumb: 'detail-page',
          title: 'detail-page'
        }
      }
    ],
  },
  { path: 'daily-menu', component: DailyMenuComponent, data: {
      breadcrumb: 'daily-menu',
      title: 'daily-menu'
    }
  },
  { path: 'account', component: NotFoundComponent, canActivate: [LoggedGuard], data: {
      breadcrumb: 'account',
      title: 'account'
    }
  },
  {
    path: 'cart',
    component: CartComponent,
    data: { title: 'cart', breadcrumb: 'cart'},
  },
  {
    path: 'checkout/foods',
    component: OrderComponent,
    data: { title: 'order_food', breadcrumb: 'order_food'},
    canActivate: [LoggedGuard]
  },
  {
    path: 'checkout/materials',
    component: OrderComponent,
    data: { title: 'order_material', breadcrumb: 'order_material'},
    canActivate: [LoggedGuard]
  },
  { path: 'about', component: AboutComponent, data: {
    breadcrumb: 'about_page',
    title: 'order'
    }
  },
  { path: 'search/:type', component: MainSearchComponent, data: {
      breadcrumb: 'search_page',
      title: 'order'
    }
  },
  { path: '**', component: NotFoundComponent }
];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
