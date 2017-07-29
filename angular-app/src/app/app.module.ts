import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TEMPLATECOMPONENTS } from './component/template';
import { CARTCOMPONENTS } from './component/cart';
@NgModule({
  declarations: [
    AppComponent,
    TEMPLATECOMPONENTS,
    CARTCOMPONENTS
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
