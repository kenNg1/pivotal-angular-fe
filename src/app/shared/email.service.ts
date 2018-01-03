import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';

const DOMAIN_NAME_PLACEHOLDER = 'pivotalsport.com';
const SETTING_API_KEY_NAME = 'key-d2d2df0980d3eff66e1b3046e03df6ec';

@Injectable()
export class EmailService {

  private readonly _apiHost = `https://api.mailgun.net/v3/${DOMAIN_NAME_PLACEHOLDER}/messages`;

  private readonly _statusUrl = 'https://www.mailgun.com/';

  private readonly _settingApiKeyName = SETTING_API_KEY_NAME;

  private get _headers(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.append('Authorization', 'Basic ' + btoa(`api:${this._settingApiKeyName}`));
    headers = headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  constructor(private http: HttpClient) { }

  public async sendMail(from: string, to: string, subject: string, message: string): Promise<boolean> {
    const body = this._getSendMailRequestBody(from, to, subject, message);
    
    const result = await this.http.post(this._apiHost, body, {
      headers: this._headers,
      responseType: 'text'
    }).toPromise();

    alert(body);
    return true;
  }
  private _getSendMailRequestBody(from: string, to: string, subject: string, message: string) {
    const body = new URLSearchParams();

    body.set('from', from);
    body.set('to', to);
    body.set('subject', subject);
    body.set('text', message);

    return body.toString();
  }

}
