import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Headers, Response, Http } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable'; 
import { User } from './user'
import { Detail } from "../shared/detail.model";

@Injectable()

export class DetailService {
  headers: Headers
  
  private detailsUrl = 'http://localhost:3000/details'; // URL to web api
  
  constructor(
    // public firstName:string,
    private tokenService: Angular2TokenService,
    private router: Router,
    private http:Http
  ) { this.headers = new Headers({'Content-Type': 'application/json'})    
  }

  getDetails(){
    return this.http.get(this.detailsUrl)
    .toPromise()
    .then(response => {
      return response.json(); 
    })
    .catch(this.handleError)
  }

  getDetail(id:number){
    const url = `${this.detailsUrl}/${id}`;
    return this.http.get(url)
      .toPromise()
  }

  createUserDetail(res,firstName,lastName){
    console.log(res.json().data.id);
    console.log(firstName);
    console.log(lastName);
    return this.http
    .post(this.detailsUrl, JSON.stringify(
      {
        user_id: res.json().data.id,
        firstName: firstName,
        lastName: lastName,
        tier: 1,
        image: "https://lovelace-media.imgix.net/uploads/999/87d36be0-39a4-0133-8e8d-0e17bac22e39.gif?w=740&h=539&fit=max&auto=format"
      }),{headers: this.headers})
    .toPromise()
    .then(res => res.json().data)
    .catch(this.handleError);
  }

  updateUserDetail(detail:Detail){
     const url = `${this.detailsUrl}/${detail.user_id}`
     return this.http
       .put(url, JSON.stringify(detail), {headers:this.headers})
       .toPromise()
       .then(response => response)
       .catch(this.handleError)
  }

  updateUserTier(id,tier){
    const url = `${this.detailsUrl}/${id}`
    return this.http
      .put(url, JSON.stringify(
        {
         id:id,
         tier:tier
        }
      ), {headers:this.headers})
      .toPromise()
      .then(response => response)
      .catch(this.handleError)
  }

  private handleError(error:any): Promise<any> {
    console.log('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error)
  }


}
