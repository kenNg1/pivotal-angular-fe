import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MdSliderModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './events/landing.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { SearchResultsComponent } from './search/search-results.component';
import { EventDetailComponent } from './events/event-detail.component';
import { MappingComponent } from './events/maps/mapping/mapping.component';
import { SignInComponent } from './user/sign-in.component';
import { SignUpComponent } from './user/sign-up.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    EventThumbnailComponent,
    SearchResultsComponent,
    EventDetailComponent,
    MappingComponent,
    SignInComponent,
    SignUpComponent,
  ],
  imports: [
    BrowserModule,
    MdSliderModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 