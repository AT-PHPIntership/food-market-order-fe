import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {TemplateComponents} from './component/template';
import {CategoryComponents} from './component/category';
@NgModule({
    declarations: [
        AppComponent,
        TemplateComponents,
        CategoryComponents
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
