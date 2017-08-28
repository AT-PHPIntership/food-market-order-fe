import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {TemplateComponent} from './component/template';
import { routing } from './app.route';
import {LoginComponent} from './component/login/login.component';
import {HttpModule} from '@angular/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TokenService} from './service/token.service';
import {ShareService} from './service/share.service';
@NgModule({
    declarations: [
        AppComponent,
        TemplateComponent,
        LoginComponent
    ],
    imports: [
        routing,
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        HttpModule
    ],
    providers: [TokenService, ShareService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
