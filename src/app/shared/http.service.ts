import {Injectable} from '@angular/core';
import {Http, XHRBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpService extends Http {

  constructor (backend: XHRBackend, options: RequestOptions) {
    const token = JSON.parse(localStorage.getItem('currentUser'))? JSON.parse(localStorage.getItem('currentUser')).token : null;
    // your custom token getter function here
    super(backend, options);
  }

  ownApi(req) {
    if(req.url.indexOf('maps.googleapis') !== -1) {
      return false;
    } else {
      return true;
    }
  }

  request(req: string|Request, options?: RequestOptionsArgs): Observable<Response> {
    const token = JSON.parse(localStorage.getItem('currentUser'))? JSON.parse(localStorage.getItem('currentUser')).token : null;
      if (typeof req === 'string') { // meaning we have to add the token to the options, not in url
      if (!options) {
        // let's make option object
        options = {headers: new Headers()};
      }
      options.headers.set('Authorization', `Bearer ${token}`);
    } else {      
      if(this.ownApi(req)) {
        req.headers.set('x-access-token', token);
        // we have to add the token to the url object
      }
      

    }
    return super.request(req, options).catch(this.catchAuthError(this));
  }

  private catchAuthError (self: HttpService) {
    // we have to pass HttpService's own instance here as `self`
    return (res: Response) => {
      console.log(res);
      if (res.status === 401 || res.status === 403) {
        // if not authenticated
        console.log(res);
      }
      return Observable.throw(res);
    };
  }
}

