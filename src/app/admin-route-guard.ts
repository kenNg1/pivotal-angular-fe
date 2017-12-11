import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './user/auth.service';
import { DetailService } from './user/detail.service';
import { Location} from '@angular/common';

@Injectable()
export class AdminRouteGuard implements CanActivate {
    
  constructor(private authService: AuthService, private detailService: DetailService, private _location: Location) {}

    canActivate() {
        const id=JSON.parse(localStorage.getItem('currentUser')).id;
        const email=JSON.parse(localStorage.getItem('currentUser')).email;
        if(email === ('alicia@pivotalsport.com' || 'johann.ruffie@gmail.com' || 'johann@pivotalsport.com')) {
            return true;
        }
        return this.detailService.getDetail(id).then(detail => {
            const userDetail = detail.json();
            if (userDetail.tier === '3') {
                return true;
            } else {
                this._location.back();
                return false;
            }
        });
    }
}

