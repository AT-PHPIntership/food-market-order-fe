import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { TEMPLATECOMPONENTS } from './component/template';
import { RegisterComponent } from './component/register/register.component';
@NgModule({
  declarations: [
    AppComponent,
    TEMPLATECOMPONENTS,
    RegisterComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
