import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TemplateComponent } from './component/template';
import { routing } from './app.route';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { SharedModule } from './shared/shared.module';
import { RangePipe } from './pipe/range.pipe';
import { DetailFoodComponent } from './component/detail-food/detail-food.component';
import { PrimaryBlockComponent } from './component/detail-food/primary-block/primary-block.component';

@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        LoginComponent,
        RegisterComponent,
        RangePipe,
        DetailFoodComponent,
        PrimaryBlockComponent,
        DetailFoodComponent
    ],
    imports: [
        routing,
        BrowserModule,
        SharedModule.forRoot(),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
