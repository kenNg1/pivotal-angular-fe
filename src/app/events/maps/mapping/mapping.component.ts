import { Component, OnInit } from '@angular/core';
import { Event } from '../../../shared/event.model'
import { ActivatedRoute} from '@angular/router'
import { EventService } from '../../../shared/event.service'

declare var google: any;

@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styles: [`
    #customSkinMap {
      height: 400px;
      width: 100%;
    }
  `]
})
export class MappingComponent implements OnInit {
  constructor(private eventService:EventService, private route:ActivatedRoute) { }
  event:Event
  ngOnInit() {
    this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
    var location = this.event.location.address;
    console.log(location);
    var myLatlng = new google.maps.LatLng(40.748817, -73.985428);
    var mapOptions = {
        zoom: 13,
        center: myLatlng,
        scrollwheel: false, //we disable de scroll over the map, it is a really annoing when you scroll through page
        disableDefaultUI: true, // a way to quickly hide all controls
        zoomControl: true,
        styles: [{"featureType":"water","stylers":[{"saturation":43},{"lightness":-11},{"hue":"#0088ff"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"hue":"#ff0000"},{"saturation":-100},{"lightness":99}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"color":"#808080"},{"lightness":54}]},{"featureType":"landscape.man_made","elementType":"geometry.fill","stylers":[{"color":"#ece2d9"}]},{"featureType":"poi.park","elementType":"geometry.fill","stylers":[{"color":"#ccdca1"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#767676"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"}]},{"featureType":"poi","stylers":[{"visibility":"off"}]},{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#b8cb93"}]},{"featureType":"poi.park","stylers":[{"visibility":"on"}]},{"featureType":"poi.sports_complex","stylers":[{"visibility":"on"}]},{"featureType":"poi.medical","stylers":[{"visibility":"on"}]},{"featureType":"poi.business","stylers":[{"visibility":"simplified"}]}]
    }
    var map = new google.maps.Map(document.getElementById("customSkinMap"), mapOptions);

    var marker = new google.maps.Marker({
        position: myLatlng,
        title:"Custom Skin & Settings Map!"
    });

    marker.setMap(map);
  }
}
