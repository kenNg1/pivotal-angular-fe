import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './user/auth.service';
import { Location} from '@angular/common';

@Injectable()
export class LoginRouteGuard implements CanActivate {

  constructor(private authService: AuthService, private _location: Location) {}

  canActivate() {
    const a = !!JSON.parse(localStorage.getItem('currentUser'));
    if (!a) {
      return true;
    } else {
      this._location.back();
      return false;
    }
  }
}

