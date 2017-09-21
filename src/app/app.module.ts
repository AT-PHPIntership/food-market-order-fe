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
import { MaterialComponent } from './component/material/material.component';
import { ItemMaterialComponent } from './component/material/item-material/item-material.component';
import { DailyMenuComponent } from './component/dailymenu/dailymenu.component';
import { ProductsDailyMenuComponent } from './component/dailymenu/list-products/list-products.component';
import { RangePipe } from './pipe/range.pipe';
import { PaginationService } from './service/pagination.service';
import { TemplateComponent } from './component/template/index';
import { APIService } from './service/api.service';
import { ItemFoodComponent } from './component/listfood/item-food/item-food.component';
import { HomeComponent } from './component/home/home.component';
import { TopTrendComponent } from './component/home/top-trend/top-trend.component';
import { SlideShowComponent } from './component/home/slide-show/slide-show.component';

@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        LoginComponent,
        CategoryComponents,
        ListfoodComponent,
        MaterialComponent,
        DailyMenuComponent,
        ProductsDailyMenuComponent,
        ItemFoodComponent,
        ItemMaterialComponent,
        RegisterComponent,
        RangePipe,
        HomeComponent,
        TopTrendComponent,
        SlideShowComponent
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
