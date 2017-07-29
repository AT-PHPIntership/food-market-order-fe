import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TEMPLATECOMPONENTS } from './component/template';
import { SEARCHCOMPONENTS } from './component/search';
@NgModule({
  declarations: [
    AppComponent,
    TEMPLATECOMPONENTS,
    SEARCHCOMPONENTS
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
