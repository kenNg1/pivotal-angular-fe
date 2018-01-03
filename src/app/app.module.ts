import { BrowserModule } from '@angular/platform-browser';
import { AsyncLocalStorageModule } from 'angular-async-local-storage';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';
import { HttpService } from './shared/http.service';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'hammerjs';
import { MatSliderModule, MatSelectModule , MatAutocompleteModule, MatDialogModule, MatDialogRef, MatIconModule} from '@angular/material';

import { Angular2TokenService } from 'angular2-token';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { EventService } from './shared/event.service';
import { SportService } from './shared/sport.service';
import { DistrictService } from './shared/district.service';
import { AppRoutingModule } from './app-routing.module';
import { NavbarComponent } from './navbar/navbar.component';
import { LandingComponent } from './events/landing.component';
import { EventThumbnailComponent } from './events/event-thumbnail.component';
import { SearchResultsComponent } from './search/search-results.component';
import { EventDetailComponent } from './events/event-detail.component';
import { MappingComponent } from './events/maps/mapping/mapping.component';
import { SignInComponent } from './user/sign-in.component';
import { SignUpComponent } from './user/sign-up.component';
import { NewEventComponent } from './events/new-event.component';
import { SportSearchService } from './search/sport-search.service';
// import { AuthenticationService } from "./user/authentication.service";
import { AuthService } from './user/auth.service';
import { ProfileComponent } from './user/profile/profile.component';
import { UserApprovalComponent } from './user/admin/user-approval.component';
import { DetailService } from './user/detail.service';
import { AgmCoreModule } from '@agm/core';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { FileUploadModule } from 'ng2-file-upload';
import { LoginRouteGuard } from './login-route-guard';
import { AdminRouteGuard } from './admin-route-guard';
import { DummyComponent } from './navbar/dummy.component';
// import { CompatibilityModule } from '@angular/material';
// import {NoConflictStyleCompatibilityMode} from '@angular/material';
import {MatMenuModule} from '@angular/material/menu';
import { AboutusComponent } from './aboutus/aboutus.component';
import { ContactusComponent } from './contactus/contactus.component';
import { EmailService } from './shared/email.service';
import { URLSearchParams } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';



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
    ProfileComponent,
    UserApprovalComponent,
    DummyComponent,
    AboutusComponent,
    ContactusComponent,
  ],
  imports: [
    BrowserModule,
    AsyncLocalStorageModule,
    MatSliderModule,
    MatSelectModule,
    MatInputModule,
    MatAutocompleteModule,
    // CompatibilityModule,
    // NoConflictStyleCompatibilityMode,
    MatMenuModule,
    MatDialogModule,
    MatIconModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    Ng2CloudinaryModule,
    FileUploadModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCc8a_sf1Y_1OBBTZJqn1H7w_oKduaHutY'
    })
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    AboutusComponent,
    ContactusComponent
  ],
  providers: [
    {
      provide: HttpService,
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    },
  EventService,SportService,DistrictService,SportSearchService,Angular2TokenService,
    AuthService, DetailService, EmailService, {provide: LocationStrategy, useClass: HashLocationStrategy},LoginRouteGuard, AdminRouteGuard]
})
export class AppModule {}

export function httpFactory(backend: XHRBackend, options: RequestOptions) {
    return new HttpService(backend, options);
}
