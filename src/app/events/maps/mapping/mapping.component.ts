import { Component, OnInit, Input, OnChanges, SimpleChange } from '@angular/core';
import { Event } from '../../../shared/event.model';
import { ActivatedRoute} from '@angular/router';
import { EventService } from '../../../shared/event.service';

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
export class MappingComponent implements OnInit, OnChanges{
  title: string;
  lat: number;
  lng: number;
  zoom = 18;
  scrollwheel = false;
  @Input() address;

  constructor(private eventService:EventService, private route:ActivatedRoute) { }
  event:Event;
  ngOnInit() {
    this.eventService.getEvent(+this.route.snapshot.params['id']).then(event => {
      this.title = event.address;
      console.log('hihihi')
      console.log(this.title)
      this.eventService.getLatLong(event.address).then(result => {
        this.lat = result.results[0].geometry.location.lat;
        this.lng = result.results[0].geometry.location.lng;
      });
    });
  }

  ngOnChanges(changes: {[ propName: string]: SimpleChange}) {
		this.eventService.getEvent(+this.route.snapshot.params['id']).then(event => {
      this.title = event.address;
      console.log('hihihi')
      console.log(this.title)
      this.eventService.getLatLong(event.address).then(result => {
        this.lat = result.results[0].geometry.location.lat;
        this.lng = result.results[0].geometry.location.lng;
      });
    });
	}

  goToGoogleMaps() {
    window.open(`http://maps.google.com/maps?q=${this.lat},${this.lng}&ll=${this.lat},${this.lng}&z=17`, '_blank');
  }
}

