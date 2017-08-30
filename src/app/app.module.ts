import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { TemplateComponent } from './component/template';
import { routing } from './app.route';
import { LoginComponent } from './component/login/login.component';
import { SharedModule } from './shared/shared.module';
import { ShoppingCartComponent } from './component/cart/index';
@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        ShoppingCartComponent,
        LoginComponent
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
