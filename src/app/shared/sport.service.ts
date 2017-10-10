import { Injectable } from '@angular/core'; 
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Sport } from './sport.model';
import { environment } from '../../environments/environment';

@Injectable()
export class SportService {
  headers: Headers;
  public searchedSportId: number;
  public searchedSportName: string;


  private sportsUrl = environment.apiUrl + 'api/sports'; // URL to web api
 
  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});  
  }

  getSports(): Promise<Sport[]> {
    return this.http.get(this.sportsUrl)
      .toPromise()
      .then(response => {
        return response.json(); 
      })
      .catch(this.handleError);
  }

  // http.get returns an RxJs Observable >> this is then converted into a promise.
  // Parse the resolved json data with the method. as denoted typescript typing

  getSport(id:number): Promise<Sport> {
    const url = `${this.sportsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as Sport)
      .catch(this.handleError);
  }

  update(sport: Sport): Promise<Sport> {
    const url = `${this.sportsUrl}/${sport.id}`;
    return this.http
      .put(url, JSON.stringify(sport), {headers:this.headers})
      .toPromise()
      .then(()=>sport)
      .catch(this.handleError);
  }

  create(formValues:any): Promise<Sport> {
    return this.http
      .post(this.sportsUrl, JSON.stringify(formValues),{headers: this.headers})
      .toPromise()
      .then(res => res.json().data as Sport)
      .catch(this.handleError);
  }

  delete(id:number):Promise<void> {
    const url = `${this.sportsUrl}/${id}`;
    return this.http.delete(url, {headers:this.headers})
      .toPromise()
      .then(()=> null)
      .catch(this.handleError);
  }

  private handleError(error:any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}



