import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TemplateComponents } from './component/template';
import { HomeComponent } from "./component/home/home.component";
import { HomeComponents } from "./component/home";
import { routing } from './app.route';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { SharedModule } from './shared/shared.module';
import { CategoryComponents } from './component/category';
import { HttpModule } from '@angular/http';
import { APIService } from "./services/api.service";
import { ListfoodComponent } from './component/listfood/listfood.component';
import { ProductsFoodListComponent } from './component/listfood/products-food-list/products-food-list.component';
import {RangePipe} from './pipe/range.pipe';
import {PaginationService} from "./service/pagination.service";
@NgModule({
    declarations: [
        AppComponent,
        TemplateComponents,
        LoginComponent,
        CategoryComponents,
        HomeComponent,
        HomeComponents,
        ListfoodComponent,
        ProductsFoodListComponent,
        RegisterComponent,
        RangePipe
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
