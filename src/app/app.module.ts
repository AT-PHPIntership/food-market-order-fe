import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { routing } from './app.route';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent} from './component/userprofile/userprofile.component';
import { DropzoneModule } from 'ngx-dropzone-wrapper';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { environment } from '../environments/environment';
import { TokenService } from './service/token.service';
import { CategoryComponents } from './component/category';
import { HttpModule } from '@angular/http';
import { ListfoodComponent } from './component/listfood/listfood.component';
import { MaterialComponent } from './component/material/material.component';
import { ItemMaterialComponent } from './component/material/item-material/item-material.component';
import { DailyMenuComponent } from './component/dailymenu/dailymenu.component';
import { ProductsDailyMenuComponent } from './component/dailymenu/list-products/list-products.component';
import { RangePipe } from './pipe/range.pipe';
import { DetailFoodComponent } from './component/detail-food/detail-food.component';
import { FoodPrimaryBlockComponent } from './component/detail-food/food-primary-block/food-primary-block.component';
import { MaterialPrimaryBlockComponent } from './component/detail-material/material-primary-block/material-primary-block.component';
import { DetailMaterialComponent } from './component/detail-material/detail-material.component';
import { PaginationService } from './service/pagination.service';
import { TemplateComponent } from './component/template/index';
import { APIService } from './service/api.service';
import { ItemFoodComponent } from './component/listfood/item-food/item-food.component';
import { HomeComponent } from './component/home/home.component';
import { TopTrendComponent } from './component/home/top-trend/top-trend.component';
import { SlideShowComponent } from './component/home/slide-show/slide-show.component';
import { HomeDailymenuComponent } from './component/home/home-dailymenu/home-dailymenu.component';
import { HomeMaterialComponent } from './component/home/home-material/home-material.component';
import { ShoppingCartComponent } from './component/cart/index';
import { CheckoutComponent } from './component/order/index';
import { OrderService } from './service/order.service';
import { OnFocusDirective } from './directive/focus-class.directive';
import { ProductService } from './service/product.service';


const DROPZONE_CONFIG: DropzoneConfigInterface = {
    method: 'POST',
    url: `${environment.hostname}/api/users/upload-image`,
    maxFilesize: 10,
    acceptedFiles: 'image/*',
    addRemoveLinks: true,
    uploadMultiple: false,
    resizeWidth: 300,
    resizeHeight: 300
};
@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        LoginComponent,
        UserProfileComponent,
        CategoryComponents,
        ListfoodComponent,
        MaterialComponent,
        DailyMenuComponent,
        ProductsDailyMenuComponent,
        ItemFoodComponent,
        ItemMaterialComponent,
        RegisterComponent,
        RangePipe,
        DetailFoodComponent,
        FoodPrimaryBlockComponent,
        HomeComponent,
        TopTrendComponent,
        SlideShowComponent,
        HomeDailymenuComponent,
        HomeMaterialComponent,
        ShoppingCartComponent,
        CheckoutComponent,
        OnFocusDirective,
        DetailMaterialComponent,
        MaterialPrimaryBlockComponent
    ],
    imports: [
        routing,
        HttpModule,
        BrowserModule,
        SharedModule.forRoot(),
        DropzoneModule.forRoot(DROPZONE_CONFIG),
    ],
    providers: [
        TokenService,
        APIService,
        PaginationService,
        OrderService,
        ProductService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
