import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/event.model'
import { EventService } from '../shared/event.service'
import { Router } from '@angular/router';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {

  constructor(private eventService:EventService, private router:Router) { }

  ngOnInit() {
  }

  dists = [
    {value: 'Central', viewValue: 'Central'},
    {value: 'Causeway Bay', viewValue: 'Causeway Bay'},
    {value: 'Kowloon Tong', viewValue: 'Kowloon Tong'}
  ];

  add(formValues:any):void{
    console.log(formValues)
    this.eventService.create(formValues)
      .then((event) => {
        console.log(event)
        this.router.navigate(['/events'])
      })
  }

}
