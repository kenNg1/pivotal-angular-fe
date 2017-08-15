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
import { EventService } from "./shared/event.service";
import { SearchResultsComponent } from './search/search-results.component';
import { EventDetailComponent } from "./events/event-detail.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingComponent,
    EventThumbnailComponent,
    SearchResultsComponent,
    EventDetailComponent
  ],
  imports: [
    BrowserModule,
    MdSliderModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [EventService],
  bootstrap: [AppComponent]
})
export class AppModule { }