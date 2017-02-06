import { NgModule }       from '@angular/core';
import { HttpModule }    from '@angular/http';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule}    from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AppComponent }  from './app.component';
import { Ques1Component } from './q1.component';
import { Ques2Component } from './q2.component';
import { Ques3Component } from './q3.component';
import { RestService } from './services/rest.service';


import { AppRoutingModule }     from './app-routing.module';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpModule  ,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent,
    Ques1Component,
    Ques2Component,
    Ques3Component
  ],
  providers: [
    RestService
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
