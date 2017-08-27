import { Injectable } from '@angular/core';
import { Http }       from '@angular/http';

import { Observable }     from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { Event }           from '../shared/event.model';

@Injectable()
export class SportSearchService {
 
  constructor(private http: Http) {}

  search(term:string):Observable<Event[]>{
    return this.http
      .get(`api/events/?name=${term}`)
      .map(response => response.json().data as Event[])
  }

}