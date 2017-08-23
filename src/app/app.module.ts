import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {AppComponent} from './app.component';
import {TemplateComponents} from './component/template';
import {CategoryComponents} from './component/category';
import { HomeComponents } from './component/home';
import { APIService } from './services/api.service';
@NgModule({
    declarations: [
        AppComponent,
        TemplateComponents,
        CategoryComponents,
        HomeComponents
    ],
    imports: [
        BrowserModule,
        HttpModule
    ],
    providers: [APIService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
