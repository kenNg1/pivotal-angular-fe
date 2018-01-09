import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import 'rxjs/add/observable/throw';

import { environment } from '../../environments/environment';

/* 
const DOMAIN_NAME_PLACEHOLDER = 'pivotalsport.com';
const SETTING_API_KEY_NAME = 'key-d2d2df0980d3eff66e1b3046e03df6ec';*/

@Injectable()
export class EmailService {
  private emailUrl = environment.apiUrl + 'api/email'; // URL to web api

 /* private readonly _apiHost = `https://api.mailgun.net/v3/${DOMAIN_NAME_PLACEHOLDER}/messages`;

  private readonly _statusUrl = 'https://www.mailgun.com/';

  private readonly _settingApiKeyName = SETTING_API_KEY_NAME;

  private get _headers(): HttpHeaders {
    let headers = new HttpHeaders();
    // headers = headers.append('Authorization', 'Basic ' + btoa(`api:${this._settingApiKeyName}`));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  private get _params(): HttpParams {
    let params = new HttpParams();
    params = params.append('login', 'postmaster@pivotalsport.com');
    params = params.append('password', '280de9ae822e638c48c0351954da82dd');
    return params;
  } */

  constructor(private http: Http) { }

  sendMail(data) {
    return this.http.post(this.emailUrl, data)
    .map(res => res.json())
    .catch(this._errorHandler);
  }

  private _errorHandler(error: Response) {
    console.error(error);
    return Observable.throw(error || 'Server Error');
  }
}

/*
  public sendMail(from: string, to: string, subject: string, message: string): any {
    const body = this._getSendMailRequestBody(from, to, subject, message);
    console.log(body);
    console.log('3');
    console.log(this._headers);
    const result = this.http.post(this._apiHost, body, {
      headers: this._headers,
      params: this._params,
    }).subscribe(data => {
      console.log('envoye');
    },
    err => this.handleError(err));    
    // .map(res => console.log(res))
    // .catch(err => this.handleError(err));

    console.log('3.1');
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      console.log('1');
    } else {
      console.log('1.2');
      errMsg = error.message ? error.message : error.toString();
    }
    console.log('1.3');
    console.error(errMsg);
    return Observable.throw(errMsg);
  }


  private _getSendMailRequestBody(from: string, to: string, subject: string, message: string) {
    const body = new URLSearchParams();
    console.log('2');
    body.set('from', from);
    body.set('to', to);
    body.set('subject', subject);
    body.set('text', message);
    console.log('2.2');

    return body.toString();
  }
}
  */

