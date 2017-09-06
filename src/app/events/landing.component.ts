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
    this.eventService.getEvents().then(events => {this.events = events; console.log(this.events)})
  }

  getSports(): void {
    this.sportService.getSports()
      .then(sports => {
        this.sports = sports;
        let repeat = 5-sports.length%5;
        for(let i=0;i<repeat;i++){
          this.sports.push(this.sports[i])
        }
        console.log(this.sports.length)
        this.setRandoms();
      })
  }

  setRandoms():void{
    // if(this.randomBegin<0){
    //   let modulo = this.sports.length%5
    //   this.randoms = this.sports.slice(this.sports.length+this.randomBegin,this.sports.length+this.randomEnd-modulo)
    // }
    let current = this.randomBegin
    
    if(this.randomBegin<0){
      console.log("less than zero",this.randomBegin);          
      
      console.log("current",current)
      let arr = []
      
      if(current<0){
        console.log("start pushing")
        
        for(let i=0;i<5;i++){
        arr.push(this.sports[this.sports.length+current])
        current += 1
        }
      }
      else {
        arr.push(this.sports[current])
      }
      this.randoms = arr
    }else{
      this.randoms = this.sports.slice(this.randomBegin,this.randomBegin+5)
    }


    
  }

  // BELOW IS prior to using promises
  // getEvents(): void {
  //   this.events = this.eventService.getEvents()
  // }


  randomLeft(){
    this.randomBegin -= 5;
    if(this.randomBegin<this.sports.length*-1){
      this.randomBegin=0;
    }
    this.setRandoms();
  }

  randomRight(){
    this.randomBegin += 5;
    if(this.randomBegin==this.sports.length){
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
