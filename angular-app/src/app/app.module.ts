import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TEMPLATECOMPONENTS } from './component/template';
import { PRODUCTCOMPONENTS } from './component/product';
@NgModule({
  declarations: [
    AppComponent,
    TEMPLATECOMPONENTS,
    PRODUCTCOMPONENTS
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
