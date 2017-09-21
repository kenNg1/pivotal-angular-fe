import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styles: [`
    .card-product {
      height: 320px !important;
      position:relative;
      
    }

    .card-footer .price{
      position:absolute;
      bottom: 10px;
    }

    .card-footer .stats{
      position:absolute;
      bottom: 10px;
      right: 15px
    }
  `]
})
export class EventThumbnailComponent implements OnInit {
  
  @Input() event:Event;

  constructor() { }

  ngOnInit() {
  }

} 
