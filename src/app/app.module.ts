import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.route';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { SharedModule } from './shared/shared.module';
import { CategoryComponents } from './component/category';
import { HttpModule } from '@angular/http';
import { ListfoodComponent } from './component/listfood/listfood.component';
import { DailyMenuComponent } from './component/dailymenu/dailymenu.component';
import { ProductsDailyMenuComponent } from './component/dailymenu/list-products/list-products.component';
import { RangePipe } from './pipe/range.pipe';
import { PaginationService } from './service/pagination.service';
import { TemplateComponent } from './component/template/index';
import { APIService } from './service/api.service';
import { ItemFoodComponent } from './component/listfood/item-food/item-food.component';
import { ShoppingCartComponent } from './component/cart/index';
import { CheckoutComponent } from './component/order/index';
import { OrderService } from './service/order.service';
import { OnFocusDirective } from './directive/focus-class.directive';
import { OrderDetailComponent } from './component/account/orderDetail/orderDetail.component';

@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        LoginComponent,
        CategoryComponents,
        ListfoodComponent,
        DailyMenuComponent,
        ProductsDailyMenuComponent,
        ItemFoodComponent,
        RegisterComponent,
        RangePipe,
        ShoppingCartComponent,
        CheckoutComponent,
        OnFocusDirective,
        OrderDetailComponent,
    ],
    imports: [
        routing,
        BrowserModule,
        SharedModule.forRoot(),
        HttpModule,
    ],
    providers: [APIService, PaginationService, OrderService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
