import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';
import { Sport } from "../shared/sport.model";
import { EventService } from '../shared/event.service';
import { SportService } from "../shared/sport.service";

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
}) 
export class LandingComponent implements OnInit {
  events:Event[]=[]
  sports:Sport[]=[]
  randoms:Sport[]=[]
  randomBegin: number = 0
  
  constructor(private eventService:EventService, private sportService:SportService) { }

  ngOnInit():void {
    this.getEvents();
    this.getSports();
  }

  getEvents(): void {
    this.eventService.getEvents().then(events => {this.events = events})
  }

  getSports(): void {
    this.sportService.getSports()
      .then(sports => {
        this.sports = sports;
        this.setRandoms();
      })
  }

  setRandoms():void{
    // if(this.randomBegin<0){
    //   let modulo = this.sports.length%5
    //   this.randoms = this.sports.slice(this.sports.length+this.randomBegin,this.sports.length+this.randomEnd-modulo)
    // }else{
      let current = this.randomBegin-5
      let arr = []
      for (let i=0;i>5;i++){
        if(current<0){
          arr.push(this.sports[this.sports.length+current])
          current += 1
        }
        else {
          arr.push(this.sports[current])
        }
      }
      this.randoms = arr
    // }
  }

  // BELOW IS prior to using promises
  // getEvents(): void {
  //   this.events = this.eventService.getEvents()
  // }


  randomLeft(){
    this.randomBegin -= 5;
    this.setRandoms();
    console.log(this.randomBegin)
  }

  randomRight(){
    this.randomBegin += 5;
    this.setRandoms();
  }


  // ABOVE IMPLEMENTATION IS OFFICIAL DOCS
  // ngOnInit() {
  //   this.events = this.eventService.getEvents().map(events => events)
  //   return this.events
  // }

}
