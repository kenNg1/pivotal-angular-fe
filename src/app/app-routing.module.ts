import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './events/landing.component';
import { SearchResultsComponent } from './search/search-results.component';
import { EventDetailComponent } from './events/event-detail.component';
import { SignInComponent } from './user/sign-in.component';
import { SignUpComponent } from './user/sign-up.component';
import { NewEventComponent } from './events/new-event.component';
import { ProfileComponent } from './user/profile/profile.component';
import { UserApprovalComponent } from './user/admin/user-approval.component';
import { LoginRouteGuard } from './login-route-guard';
import { AdminRouteGuard } from './admin-route-guard';
import { DummyComponent } from './navbar/dummy.component';

const routes: Routes = [
  { path: '', redirectTo: '/events', pathMatch: 'full' },
  { path: 'events/new-event', component: NewEventComponent },
  { path: 'events/:id', component: EventDetailComponent},
  { path: 'events', component: LandingComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'signin', component: SignInComponent, canActivate: [LoginRouteGuard]},
  { path: 'signup', component: SignUpComponent, canActivate: [LoginRouteGuard]},
  { path: 'profile', component: ProfileComponent},
  { path: 'admin/user-approval', component: UserApprovalComponent, canActivate: [AdminRouteGuard] },
  { path: 'dummy', component: DummyComponent }  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
