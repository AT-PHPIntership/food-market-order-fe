import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import { TemplateComponents } from './component/template';
import { routing } from './app.route';
import { LoginComponent } from './component/login/login.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
    declarations: [
        AppComponent,
        TemplateComponents,
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
