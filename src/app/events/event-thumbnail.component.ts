import { Component, Input, OnInit } from '@angular/core';
import { IEvent } from '../shared/event.model';

@Component({
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styles: []
})
export class EventThumbnailComponent implements OnInit {
  
  @Input() event:IEvent

  constructor() { }

  ngOnInit() {
  }

}
