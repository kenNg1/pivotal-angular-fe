var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { EventService } from '../shared/event.service';
import { Router } from '@angular/router';
import { SportService } from '../shared/sport.service';
import { DistrictService } from '../shared/district.service';
// import { AuthenticationService } from "../user/authentication.service";
import { AuthService } from "../user/auth.service";
var NewEventComponent = (function () {
    function NewEventComponent(eventService, router, sportService, districtService, authService) {
        this.eventService = eventService;
        this.router = router;
        this.sportService = sportService;
        this.districtService = districtService;
        this.authService = authService;
        this.sports = [];
        this.districts = [];
    }
    NewEventComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        this.sportService.getSports().then(function (sports) {
            _this.sports = sports;
        });
        this.districtService.getDistricts().then(function (districts) {
            _this.districts = districts;
        });
    };
    NewEventComponent.prototype.add = function (formValues) {
        var _this = this;
        console.log(formValues);
        this.eventService.create(formValues)
            .then(function (event) {
            console.log(event);
            _this.router.navigate(['/events']);
        });
    };
    return NewEventComponent;
}());
NewEventComponent = __decorate([
    Component({
        selector: 'app-new-event',
        templateUrl: './new-event.component.html',
        styleUrls: ['./new-event.component.scss']
    }),
    __metadata("design:paramtypes", [EventService, Router, SportService, DistrictService, AuthService])
], NewEventComponent);
export { NewEventComponent };
//# sourceMappingURL=new-event.component.js.map