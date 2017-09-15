import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/event.model'
import { EventService } from '../shared/event.service'
import { Router } from '@angular/router';
import { Sport } from '../shared/sport.model';
import { SportService } from '../shared/sport.service';
import { District } from '../shared/district.model';
import { DistrictService } from '../shared/district.service';
// import { AuthenticationService } from "../user/authentication.service";
import { AuthService } from "../user/auth.service";

@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  sports = [];
  districts = [];
  userId
  currentUser

  constructor(private eventService:EventService, private router:Router, private sportService:SportService, private districtService:DistrictService, private authService: AuthService) { }

  ngOnInit() {
    this.sportService.getSports().then(sports => {
      this.sports = sports
    })
    this.districtService.getDistricts().then(districts => {
      this.districts = districts
    })
  }

  add(formValues:any):void{
    console.log(formValues)
    this.eventService.create(formValues)
      .then((event) => {
        console.log(event)
        this.router.navigate(['/events'])
      })
  }

}
