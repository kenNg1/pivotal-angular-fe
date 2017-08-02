import { Component, OnInit } from '@angular/core';
import { IEvent } from '../shared/event.model';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  events:IEvent[]

  constructor(private eventService:EventService) { }

  ngOnInit() {
    this.events = this.eventService.getEvents().map(events => events)
    return this.events
  }

}
