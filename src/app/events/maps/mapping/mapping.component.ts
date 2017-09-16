import { Component, OnInit } from '@angular/core';
import { Event } from '../../../shared/event.model'
import { ActivatedRoute} from '@angular/router'
import { EventService } from '../../../shared/event.service'

declare var google: any;

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styles: [`
    agm-map {
      height: 400px;
    }
  `]
})
export class MappingComponent implements OnInit {
  title: string;
  lat: number;
  lng: number;
  zoom: number = 18;

  constructor(private eventService:EventService, private route:ActivatedRoute) { }
  event:Event
  ngOnInit() {
    this.eventService.getEvent(+this.route.snapshot.params['id']).then(event => {
      this.title = event.address;
      this.eventService.getLatLong(event.address).then(result => {
        this.lat = result.results[0].geometry.location.lat
        this.lng = result.results[0].geometry.location.lng
      })
    })
    
  }
}