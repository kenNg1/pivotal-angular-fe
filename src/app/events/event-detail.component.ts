import { Component, OnInit } from '@angular/core';
import { IEvent } from '../shared/event.model'
import { ActivatedRoute} from '@angular/router'
import { EventService } from '../shared/event.service'


@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event:IEvent
  constructor(private eventService:EventService, private route:ActivatedRoute ) { }

  ngOnInit() {
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  }


}
