import { Injectable } from '@angular/core'; 
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { District } from './district.model';
import { environment } from '../../environments/environment';


@Injectable()
export class DistrictService {
  headers: Headers;

  private districtUrl = environment.apiUrl + 'api/districts'; // URL to web api
 
  constructor(private http: Http) {
    this.headers = new Headers({'Content-Type': 'application/json'});
  }

  getDistricts(): Promise<District[]> {
    return this.http.get(this.districtUrl)
      .toPromise()
      .then(response => {
        return response.json(); 
      })
      .catch(this.handleError);
  }

  // http.get returns an RxJs Observable >> this is then converted into a promise.
  // Parse the resolved json data with the method. as denoted typescript typing

  getDistrict(id:number): Promise<District> {
    const url = `${this.districtUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
      .then(response => response.json().data as District)
      .catch(this.handleError);
  }

  update(district: District): Promise<District> {
    const url = `${this.districtUrl}/${district.id}`;
    return this.http
      .put(url, JSON.stringify(district), {headers:this.headers})
      .toPromise()
      .then(()=>district)
      .catch(this.handleError);
  }

  create(formValues:any): Promise<District> {
    return this.http
      .post(this.districtUrl, JSON.stringify(formValues),{headers: this.headers})
      .toPromise()
      .then(res => res.json().data as District)
      .catch(this.handleError);
  }

  delete(id:number):Promise<void> {
    const url = `${this.districtUrl}/${id}`;
    return this.http.delete(url, {headers:this.headers})
      .toPromise()
      .then(()=> null)
      .catch(this.handleError);
  }

  private handleError(error:any): Promise<any> {
    return Promise.reject(error.message || error);
  }

}



