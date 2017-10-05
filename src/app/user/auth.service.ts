import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
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
  public currentUser: User;
  public currentUserId: number; 
  public firstName: string;
  public lastName: string;
  public email: string;
  public loggedIn = false;
  
  constructor(public http: Http) { }

  setUser(user: User) {
    // this.userSource.next(user);
  }

  registerUser(user: User): Observable<boolean> {
    const body = JSON.stringify(user); 
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });
    return this.http.post(`${this.base_url}/register`, body, options).map( (res) => this.setToken(res) );
  }

  loginUser(user:User): Observable<Object> {
    const body = JSON.stringify(user);
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    const options = new RequestOptions({ headers: headers });

    return this.http.post(`${this.base_url}/login`, body, options).map( (res) => this.setToken(res) );
  }

  logout() {
    this.token = null;
    localStorage.removeItem('currentUser');
    this.loggedIn = false;    
  }

  verify(): Observable<Object> {

    const currUser = JSON.parse(localStorage.getItem('currentUser')); 
    const token = ( currUser && 'token' in currUser) ? currUser.token : this.token;
    const headers = new Headers({ 'x-access-token': token });
    const options = new RequestOptions({ headers: headers });
    return this.http.get(`${this.base_url}/check-state`, options).map( res => this.parseRes(res));
    
  }

  setToken(res:any) {
    const body = JSON.parse(res['_body']);
    console.log(body);
    
    if( body['username'] != null ) {
      this.token = body['token'];
      localStorage.setItem('currentUser', JSON.stringify({ 
        username: body['username'],
        email: body['email'], 
        id: body['id'],
        tier: body['tier'],
        token: this.token
      }));
    }
    this.email = JSON.parse(localStorage.getItem('currentUser')).email;
    this.loggedIn = true;
    return body;
  }

  parseRes(res:any) {
    const body = JSON.parse(res['_body']);
    return body;
  }

}

