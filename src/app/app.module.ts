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
import { DetailFoodComponent } from './component/detail-food/detail-food.component';
import { PrimaryBlockComponent } from './component/detail-food/primary-block/primary-block.component';
import { PaginationService } from './service/pagination.service';
import { TemplateComponent } from './component/template/index';
import { APIService } from './service/api.service';
import { ItemFoodComponent } from './component/listfood/item-food/item-food.component';

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
        DetailFoodComponent,
        PrimaryBlockComponent
    ],
    imports: [
        routing,
        BrowserModule,
        SharedModule.forRoot(),
        HttpModule,
    ],
    providers: [APIService, PaginationService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
