import { Component, OnInit } from '@angular/core';
import { IEvent } from '../shared/event.model';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  events:IEvent[]

  constructor(private eventService:EventService) { }

  ngOnInit() {
    this.events = this.eventService.getEvents().map(events => events)
    return this.events
  }

}
