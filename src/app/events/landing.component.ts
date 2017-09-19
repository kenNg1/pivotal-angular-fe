import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';
import { Sport } from '../shared/sport.model';
import { EventService } from '../shared/event.service';
import { SportService } from '../shared/sport.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
}) 
export class LandingComponent implements OnInit {
  events:Event[]=[];
  sports:Sport[]=[];
  randoms:Sport[]=[];
  randomBegin = 0;

  constructor(private eventService:EventService, private sportService:SportService) { }

  ngOnInit():void {
    this.getEvents();
    this.getSports();
  }

  getEvents(): void {
    this.eventService.getEvents().then(events => {
      this.events = events.sort(sortByDateAsc); 
    });
  }

  getSports(): void {
    this.sportService.getSports()
      .then(sports => {
        this.sports = sports;
        const repeat = 5-sports.length%5;
        for(let i=0;i<repeat;i++) {
          this.sports.push(this.sports[i]);
        }
        this.setRandoms();
      });
  }

  setRandoms():void {
    const arr = [];
    let beg = this.randomBegin;
    for (let i=0;i<5;i++) {
      if (beg>=0 && beg<this.sports.length) {
        arr.push(this.sports[beg]);
        beg+=1;
      } else if (beg>=this.sports.length-1) {
        beg = beg-this.sports.length;
        arr.push(this.sports[beg]);
        beg+=1;
      } else if (beg<0) {
        beg = this.sports.length+beg;
        arr.push(this.sports[beg]);
        beg+=1;
      }
    }
    if (this.randomBegin < 0) {
      this.randomBegin = this.sports.length+this.randomBegin;
    } else if (this.randomBegin >this.sports.length-1) {
      this.randomBegin = this.randomBegin - this.sports.length;
    }
    this.randoms = arr;
  }

  // BELOW IS prior to using promises
  // getEvents(): void {
  //   this.events = this.eventService.getEvents()
  // }

  sendSport(id:number,name:string) {
    this.sportService.searchedSportId = id;
    this.sportService.searchedSportName = name;
  } 


  randomLeft() {
    this.randomBegin -= 5;
    if(this.randomBegin<this.sports.length*-1) {
      this.randomBegin=0;
    }
    this.setRandoms();
  }

  randomRight() {
    this.randomBegin += 5;
    if(this.randomBegin===this.sports.length) {
      this.randomBegin=0;
    }
    this.setRandoms();
  }


  // ABOVE IMPLEMENTATION IS OFFICIAL DOCS
  // ngOnInit() {
  //   this.events = this.eventService.getEvents().map(events => events)
  //   return this.events
  // }

}

function sortByDateAsc(e1:Event, e2:Event) {
  if(e1.date > e2.date) {
    return 1; 
  } else if(e1.date === e2.date) {
    return 0;
  } else {return -1;}
}
