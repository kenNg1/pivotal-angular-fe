import { Component, Input, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'event-thumbnail',
  templateUrl: './event-thumbnail.component.html',
  styles: [`
    .card-product {
      height: 330px !important;
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

    div.card-image{
      text-align: center;
    }

    img.img{
      max-height:100% !important;
      width:auto !important
    }

    p.category, div.price h4 {
      margin-top: 5px;
    }

    @media (min-width:990px) and (max-width:1100px) {

      div.col-lg-3.col-md-3.col-sm-6 {
        margin-right:70px        
      }

      div.card-product {
        min-width:300px;
      }
    }

  `]
})
export class EventThumbnailComponent implements OnInit {
  
  @Input() event:Event;

  constructor() { }

  ngOnInit() {
      this.event.time = this.event.time.replace(/:\d\d([ ap]|$)/,'$1');
  }
} 
