import 'rxjs/add/operator/switchMap';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router'
import { Location } from '@angular/common'

import { Event } from '../shared/event.model'
import { EventService } from '../shared/event.service'

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  event:Event;
  constructor(private eventService:EventService, private route:ActivatedRoute, private location: Location ) { }
  
  // full blown Angular docs
  ngOnInit():void {
    this.route.paramMap
      .switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
      .subscribe((event:Event) => this.event = event);
  } 

  // v1 implementation of promises - didn't work
  // ngOnInit():void {
  //   this.eventService.getEvent(+this.route.snapshot.params['id']).then(event => this.event = event)
  // }
  
  // original working w/o promises
  // ngOnInit():void {
  //   this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  // }

} 

