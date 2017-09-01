import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MdSliderModule } from '@angular/material';
import { MdSelectModule } from '@angular/material';


import { AppComponent } from './app.component';
import { EventService } from './shared/event.service';
import { AppRoutingModule } from "./app-routing.module";
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './events/landing.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { SearchResultsComponent } from './search/search-results.component';
import { EventDetailComponent } from './events/event-detail.component';
import { MappingComponent } from './events/maps/mapping/mapping.component';
import { SignInComponent } from './user/sign-in.component';
import { SignUpComponent } from './user/sign-up.component';
import { NewEventComponent } from './events/new-event.component';
import { SportSearchService } from "./search/sport-search.service";

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
    NewEventComponent,
  ],
  imports: [
    BrowserModule,
    MdSliderModule,
    MdSelectModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    AppRoutingModule    
  ],
  bootstrap: [AppComponent],
  providers: [EventService,SportSearchService]
})
export class AppModule { } 