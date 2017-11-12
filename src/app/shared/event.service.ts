import { Injectable } from '@angular/core'; 
import { Headers, Http } from '@angular/http';
import {HttpService} from './http.service';

import 'rxjs/add/operator/toPromise';
import { Event } from './event.model';
import { environment } from '../../environments/environment';

@Injectable()
export class EventService {
  headers: Headers;

  private eventsUrl = environment.apiUrl + 'api/events'; // URL to web api

  constructor(private http: HttpService) {
    this.headers = new Headers({'Content-Type': 'application/json'});  
  }

  getEvents(): Promise<Event[]> {
    return this.http.get(this.eventsUrl)
      .toPromise()
      .then(response => {
        return response.json() as Event[]; 
      })
      .catch(this.handleError);
  }

  // http.get returns an RxJs Observable >> this is then converted into a promise.
  // Parse the resolved json data with the method. as denoted typescript typing

  getEvent(id:number): Promise<Event> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => {
        return response.json() as Event;
      })
      .catch(this.handleError);
  }

  getLatLong(address:string) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyDShUCLIVGmRpvGiyEIQOdpDo54gD6tQBw`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }

  update(event: Event): Promise<Event> {
    const url = `${this.eventsUrl}/${event.id}`;
    return this.http
      .put(url, JSON.stringify(event), {headers:this.headers})
      .toPromise()
      .then(response=> response.json() as Event)
      .catch(this.handleError);
  }

  updateAttendee(event: Event): Promise<Event> {
    const url = `${this.eventsUrl}/${event.id}`;
    return this.http
      .put(url, JSON.stringify(event), {headers:this.headers})
      .toPromise()
      .then(response=> response.json() as Event)
      .catch(this.handleError);
  }

  create(formValues:any): Promise<Event> {
    return this.http
      .post(this.eventsUrl, JSON.stringify(formValues),{headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Event)
      .catch(this.handleError);
  }

  delete(id:number):Promise<void> {
    const url = `${this.eventsUrl}/${id}`;
    return this.http.delete(url, {headers:this.headers})
      .toPromise()
      .then(()=> null)
      .catch(this.handleError);
  }

  private handleError(error:any): Promise<any> {
    console.log('Please login');
    // if error 403 ..
    // if error 404 ... 
    // etc etc.
    return Promise.reject(error.message || error);
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



