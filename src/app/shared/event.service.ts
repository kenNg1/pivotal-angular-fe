import { Injectable } from '@angular/core'; 
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise'
import { Event } from './event.model';

@Injectable()
export class EventService {

  private eventsUrl = 'api/events'; // URL to web api

  constructor(private http: Http){}

  getEvents(): Promise<Event[]> {
    return this.http.get(this.eventsUrl)
                .toPromise()
                .then(response => response.json().data as Event[] )
                .catch(this.handleError)
  }

  // http.get returns an RxJs Observable >> this is then converted into a promise. Parse the resolved json data with the method. as denoted typescript typing

  getEvent(id:number): Promise<Event>{
    const url = `${this.eventsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Event)
      .catch(this.handleError)
  }

  private handleError(error:any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error)
  }

  // getEvents(): Promise<Event[]> {
  //   return Promise.resolve(EVENTS)
  // }

  // getEvent(id:number): Promise<Event>{
  //   return this.getEvents()
  //               .then(events => events.find(event => event.id === id));
  // }



  // getEvent(id:number){ 
  //   return EVENTS.find(event => event.id === id)
  // }

}



