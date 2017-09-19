var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { SportService } from '../shared/sport.service';
import { DistrictService } from '../shared/district.service';
import { EventService } from '../shared/event.service';
import 'rxjs/add/operator/switchMap';
var EventDetailComponent = (function () {
    function EventDetailComponent(eventService, route, location, sportService, districtService) {
        this.eventService = eventService;
        this.route = route;
        this.location = location;
        this.sportService = sportService;
        this.districtService = districtService;
        this.sports = [];
        this.districts = [];
        this.ints = [
            { name: 'competitive', value: 'competitive', display: 'Competitive' },
            { name: 'friendly', value: 'friendly', display: 'Friendly' },
            { name: 'casual', value: 'casual', display: 'Casual' }
        ];
        this.randomAvailability = "9/10";
        this.randomInfo = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates expedita ipsa voluptatem repellendus dolores dignissimos soluta, maxime accusamus hic quos incidunt error voluptatum doloremque dicta.";
    }
    // full blown Angular docs
    EventDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.route.paramMap
            .switchMap(function (params) { return _this.eventService.getEvent(+params.get('id')); })
            .subscribe(function (res) {
            console.log(res);
            _this.event = res;
            window.scrollTo(0, 0);
            _this.intensity = _this.event.intensity;
            var str1 = "mailto:";
            var str2 = _this.event.User.email;
            var str3 = "?subject=The%20subject%20of%20the%20email&body=Yes%20I%20wanna%20go%20dude";
            _this.emailHyperlink = str1.concat(str2, str3);
            console.log(_this.emailHyperlink);
        });
        this.sportService.getSports().then(function (sports) {
            _this.sports = sports;
        });
        this.districtService.getDistricts().then(function (districts) {
            _this.districts = districts;
        });
    };
    EventDetailComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    EventDetailComponent.prototype.saveEvent = function (formValues) {
        var _this = this;
        // console.log(document.querySelectorAll('[data-name="intensity"]'))
        console.log(formValues);
        this.closeForm();
        this.eventService.update(formValues).then(function (event) {
            console.log('response', event);
            _this.event = event;
        });
    };
    EventDetailComponent.prototype.showForm = function () {
        window.scrollTo(0, 0);
        $('.modal').show();
        this.target2.nativeElement.scrollTop = 0;
    };
    EventDetailComponent.prototype.closeForm = function () {
        window.scrollTo(0, 0);
        $('.modal').hide();
    };
    EventDetailComponent.prototype.goBack = function () {
        window.scrollTo(0, 0);
        this.location.back();
    };
    EventDetailComponent.prototype.delete = function (event) {
        var _this = this;
        this.eventService
            .delete(event.id)
            .then(function () {
            _this.goBack();
        });
    };
    EventDetailComponent.prototype.checkIntensity = function (intensity) {
        this.event.intensity == intensity ? true : false;
    };
    return EventDetailComponent;
}());
__decorate([
    ViewChild('changeEventModal'),
    __metadata("design:type", Object)
], EventDetailComponent.prototype, "target2", void 0);
EventDetailComponent = __decorate([
    Component({
        selector: 'app-event-detail',
        templateUrl: './event-detail.component.html',
        styleUrls: ['./event-detail.component.scss']
    }),
    __metadata("design:paramtypes", [EventService, ActivatedRoute, Location, SportService, DistrictService])
], EventDetailComponent);
export { EventDetailComponent };
//# sourceMappingURL=event-detail.component.js.map