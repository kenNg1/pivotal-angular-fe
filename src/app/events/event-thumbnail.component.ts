import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';

@Component({
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styles: []
})
export class EventThumbnailComponent implements OnInit {
  
  @Input() event:Event

  constructor() { }

  ngOnInit() {
  }

} 
