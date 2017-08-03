import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './component/template/header/header.component';
import {FooterComponent} from './component/template/footer/footer.component';
import {NotFoundComponent} from './component/template/not-found/not-found.component';
import {PaginationComponent} from './component/template/pagination/pagination.component';
import {BreadcrumbsComponent} from './component/template/breadcrumbs/breadcrumbs.component';

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        NotFoundComponent,
        PaginationComponent,
        BreadcrumbsComponent
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
