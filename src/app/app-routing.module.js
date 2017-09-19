var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingComponent } from './events/landing.component';
import { SearchResultsComponent } from './search/search-results.component';
import { EventDetailComponent } from "./events/event-detail.component";
import { SignInComponent } from "./user/sign-in.component";
import { SignUpComponent } from "./user/sign-up.component";
import { NewEventComponent } from "./events/new-event.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { UserApprovalComponent } from "./user/admin/user-approval.component";
var routes = [
    { path: '', redirectTo: '/events', pathMatch: 'full' },
    { path: 'events/new-event', component: NewEventComponent },
    { path: 'events/:id', component: EventDetailComponent },
    { path: 'events', component: LandingComponent },
    { path: 'search', component: SearchResultsComponent },
    { path: 'signin', component: SignInComponent },
    { path: 'signup', component: SignUpComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'admin/user-approval', component: UserApprovalComponent }
];
var AppRoutingModule = (function () {
    function AppRoutingModule() {
    }
    return AppRoutingModule;
}());
AppRoutingModule = __decorate([
    NgModule({
        imports: [
            RouterModule.forRoot(routes)
        ],
        exports: [
            RouterModule
        ]
    })
], AppRoutingModule);
export { AppRoutingModule };
//# sourceMappingURL=app-routing.module.js.map