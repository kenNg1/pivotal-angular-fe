import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './events/landing.component';
import { SearchResultsComponent } from './search/search-results.component'
import { EventDetailComponent } from "./events/event-detail.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'events' },
  { path: 'events', component: LandingComponent },
  { path: 'search', component: SearchResultsComponent },
  { path: 'events/:id', component: EventDetailComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
