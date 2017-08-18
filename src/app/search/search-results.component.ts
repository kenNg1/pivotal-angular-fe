import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';
import { EventService } from '../shared/event.service';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  events:Event[]
  sortBy:string = 'date'
  filterBy:string = 'all'
  visibleEvents:Event[]=[]

  sortDate(){
    this.sortBy === 'date'
    this.visibleEvents = this.events.sort(sortByDateAsc)
  }

  sortPrice(){
    this.visibleEvents = this.events.sort(sortByPriceAsc)
  }

  filterAll(){
    this.visibleEvents = this.events
  }

  filterBeginner(){
    this.visibleEvents = this.events.filter(function(event){
      return event.level === 'Beginner'
    })
  }

  filterIntermediate(){
    this.visibleEvents = this.events.filter(function(event){
      return event.level === 'Intermediate'
    })
  }

  filterAdvanced(){
    this.visibleEvents = this.events.filter(function(event){
      return event.level === 'Advanced'
    })
  }

  constructor(private eventService:EventService) { }

  ngOnInit() {
    this.eventService.getEvents().then(events => {
      this.events = events;
      this.visibleEvents = events;
      this.sortDate();
      this.visibleEvents;
    })
  }


  // PRIOR TO promises implementation
  // ngOnInit() {
  //   this.events = this.eventService.getEvents().map(events => events)
  //   this.visibleEvents = this.events
  //   this.sortDate()
  //   return this.visibleEvents
  // }

    /// material slider
    autoTicks = false;
    disabled = false;
    invert = false;
    max = 100;
    min = 0;
    showTicks = false;
    step = 1;
    thumbLabel = true;
    value = 0;
    vertical = false;
  
    get tickInterval(): number | 'auto' {
      return this.showTicks ? (this.autoTicks ? 'auto' : this._tickInterval) : 0;
    }
    set tickInterval(v) {
      this._tickInterval = Number(v);
    }
    private _tickInterval = 1;
    // end material slider

}

function sortByDateAsc(e1:Event, e2:Event){
  if(e1.date > e2.date) return 1
  else if (e1.date === e2.date) return 0
  else return -1
}

function sortByPriceAsc(e1:Event, e2:Event){
  console.log('ken')
  if(e1.price > e2.price) return 1
  else if (e1.price === e2.price) return 0
  else return -1
}