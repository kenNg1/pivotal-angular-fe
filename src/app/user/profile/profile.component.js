var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, state, style, animate, transition, trigger } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DetailService } from "../detail.service";
var ProfileComponent = (function () {
    function ProfileComponent(authService, detailService, router) {
        this.authService = authService;
        this.detailService = detailService;
        this.router = router;
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        // REFACTOR later
        this.id = JSON.parse(localStorage.getItem('currentUser')).id;
        this.detailService.getDetail(this.id).then(function (detail) {
            //  this.id = detail.json().id
            _this.userDetail = detail.json();
            //  console.log(this.userDetail.image)
        });
        // this.authService.validate().subscribe(value=>{
        //     this.detailService.getDetail(value.id).then(detail => {
        //         this.id = detail.json().id
        //         this.userDetail = detail.json()
        //         console.log(this.userDetail.image)
        //     })
        // })
    };
    ProfileComponent.prototype.submit = function (formValues) {
        var _this = this;
        console.log(formValues);
        this.detailService.updateUserDetail(formValues).then(function (response) {
            _this.userDetail = response.json();
        });
    };
    return ProfileComponent;
}());
ProfileComponent = __decorate([
    Component({
        selector: 'app-profile',
        templateUrl: './profile.component.html',
        styleUrls: ['./profile.component.scss'],
        animations: [
            trigger('carduserprofile', [
                state('*', style({
                    '-ms-transform': 'translate3D(0px, 0px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                    '-moz-transform': 'translate3D(0px, 0px, 0px)',
                    '-o-transform': 'translate3D(0px, 0px, 0px)',
                    transform: 'translate3D(0px, 0px, 0px)',
                    opacity: 1
                })),
                transition('void => *', [
                    style({ opacity: 0,
                        '-ms-transform': 'translate3D(0px, 150px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                        '-moz-transform': 'translate3D(0px, 150px, 0px)',
                        '-o-transform': 'translate3D(0px, 150px, 0px)',
                        transform: 'translate3D(0px, 150px, 0px)',
                    }),
                    animate('0.3s 0s ease-out'),
                ])
            ]),
            trigger('cardprofile', [
                state('*', style({
                    '-ms-transform': 'translate3D(0px, 0px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 0px, 0px)',
                    '-moz-transform': 'translate3D(0px, 0px, 0px)',
                    '-o-transform': 'translate3D(0px, 0px, 0px)',
                    transform: 'translate3D(0px, 0px, 0px)',
                    opacity: 1
                })),
                transition('void => *', [
                    style({ opacity: 0,
                        '-ms-transform': 'translate3D(0px, 150px, 0px)',
                        '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                        '-moz-transform': 'translate3D(0px, 150px, 0px)',
                        '-o-transform': 'translate3D(0px, 150px, 0px)',
                        transform: 'translate3D(0px, 150px, 0px)',
                    }),
                    animate('0.3s 0.25s ease-out')
                ])
            ])
        ]
    }),
    __metadata("design:paramtypes", [AuthService, DetailService, Router])
], ProfileComponent);
export { ProfileComponent };
//# sourceMappingURL=profile.component.js.map