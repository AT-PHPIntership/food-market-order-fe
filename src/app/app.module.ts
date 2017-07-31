import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TEMPLATECOMPONENTS } from './component/template';
import { CATEGORYCOMPONENTS } from './component/category';
@NgModule({
  declarations: [
    AppComponent, TEMPLATECOMPONENTS, CATEGORYCOMPONENTS
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
