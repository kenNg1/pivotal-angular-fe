var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { BrowserModule } from '@angular/platform-browser';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MdSliderModule, MdSelectModule, MdAutocompleteModule } from '@angular/material';
import { Angular2TokenService } from 'angular2-token';
import { AppComponent } from './app.component';
import { EventService } from './shared/event.service';
import { SportService } from './shared/sport.service';
import { DistrictService } from './shared/district.service';
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
// import { AuthenticationService } from "./user/authentication.service";
import { AuthService } from "./user/auth.service";
import { ProfileComponent } from './user/profile/profile.component';
import { UserApprovalComponent } from './user/admin/user-approval.component';
import { DetailService } from "./user/detail.service";
import { AgmCoreModule } from '@agm/core';
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    NgModule({
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
            ProfileComponent,
            UserApprovalComponent,
        ],
        imports: [
            BrowserModule,
            AsyncLocalStorageModule,
            MdSliderModule,
            MdSelectModule,
            MdAutocompleteModule,
            FormsModule,
            HttpModule,
            BrowserAnimationsModule,
            AppRoutingModule,
            ReactiveFormsModule,
            AgmCoreModule.forRoot({
                apiKey: 'AIzaSyCc8a_sf1Y_1OBBTZJqn1H7w_oKduaHutY'
            })
        ],
        bootstrap: [AppComponent],
        providers: [EventService, SportService, DistrictService, SportSearchService, Angular2TokenService, AuthService, DetailService]
    })
], AppModule);
export { AppModule };
//# sourceMappingURL=app.module.js.map