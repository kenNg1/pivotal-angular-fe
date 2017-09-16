import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable }     from 'rxjs/observable';
import { User } from './user';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class AuthService {

  private base_url = 'http://127.0.0.1:8000';
  token: string;
//   private userSource = new Subject<User>();
//   user$ = this.userSource.asObservable();

  constructor(public http: Http) { }

  setUser(user: User) {
    // this.userSource.next(user);

  }

  registerUser(user: User): Observable<boolean> {
    let body = JSON.stringify(user);
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.base_url}/register`, body, options).map( (res) => this.setToken(res) );
  }

  loginUser(user): Observable<Object> {
    let body = JSON.stringify(user);
    let headers = new Headers();
		headers.append('Content-Type', 'application/json');
    let options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.base_url}/login`, body, options).map( (res) => this.setToken(res) );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  verify(): Observable<Object> {

    let currUser = JSON.parse(localStorage.getItem('currentUser')); 
    let token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
    let headers = new Headers({ 'x-access-token': token });
    let options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.base_url}/check-state`, options).map( res => {console.log('verify res',res);return this.parseRes(res)} );
    
  }

  setToken(res){
    let body = JSON.parse(res['_body']);
    console.log('body!',body)
    if( body['username'] != null ){
      this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({ 
        username: body['username'],
        email: body['email'], 
        token: this.token 
      }));
    } 
    return body;
  }

  parseRes(res){
    let body = JSON.parse(res['_body']);
    return body;
  }

}