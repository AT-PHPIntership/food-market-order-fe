import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import { HomeComponents } from './component/home';
import {TemplateComponent} from "./component/template/index";
@NgModule({
    declarations: [
        AppComponent,
        HomeComponents,
        TemplateComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
