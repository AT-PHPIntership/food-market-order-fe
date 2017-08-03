import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TemplateComponents } from './component/template';
import { HomeComponents } from './component/home';
@NgModule({
  declarations: [
    AppComponent, TemplateComponents, HomeComponents
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
