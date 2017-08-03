import { Component, OnInit } from '@angular/core';
import { IEvent } from '../shared/event.model';
import { EventService } from '../shared/event.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.scss']
})
export class SearchResultsComponent implements OnInit {
  events:IEvent[]
  bananas = this.events
  sortBy:string = 'date'

  sortDate(sort:string){
    this.sortBy === 'date'
    this.events = this.events.sort(sortByDateAsc)
  }

  sortPrice(sort:string){
    this.events = this.events.sort(sortByPriceAsc)
  }

  constructor(private eventService:EventService) { }

  ngOnInit() {
    this.events = this.eventService.getEvents().map(events => events)
    return this.events
  }
  
}

function sortByDateAsc(e1:IEvent, e2:IEvent){
  if(e1.date > e2.date) return 1
  else if (e1.date === e2.date) return 0
  else return -1
}

function sortByPriceAsc(e1:IEvent, e2:IEvent){
  console.log('ken')
  if(e1.price > e2.price) return 1
  else if (e1.price === e2.price) return 0
  else return -1
}