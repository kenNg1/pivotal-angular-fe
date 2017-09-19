import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styles: []
})
export class EventThumbnailComponent implements OnInit {
  
  @Input() event:Event;

  constructor() { }

  ngOnInit() {
  }

} 
