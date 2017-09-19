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
import { SportService } from "../shared/sport.service";
var LandingComponent = (function () {
    function LandingComponent(eventService, sportService) {
        this.eventService = eventService;
        this.sportService = sportService;
        this.events = [];
        this.sports = [];
        this.randoms = [];
        this.randomBegin = 0;
    }
    LandingComponent.prototype.ngOnInit = function () {
        this.getEvents();
        this.getSports();
    };
    LandingComponent.prototype.getEvents = function () {
        var _this = this;
        this.eventService.getEvents().then(function (events) {
            _this.events = events.sort(sortByDateAsc);
        });
    };
    LandingComponent.prototype.getSports = function () {
        var _this = this;
        this.sportService.getSports()
            .then(function (sports) {
            _this.sports = sports;
            var repeat = 5 - sports.length % 5;
            for (var i = 0; i < repeat; i++) {
                _this.sports.push(_this.sports[i]);
            }
            _this.setRandoms();
        });
    };
    LandingComponent.prototype.setRandoms = function () {
        var arr = [];
        var beg = this.randomBegin;
        for (var i = 0; i < 5; i++) {
            if (beg >= 0 && beg < this.sports.length) {
                arr.push(this.sports[beg]);
                beg += 1;
            }
            else if (beg >= this.sports.length - 1) {
                beg = beg - this.sports.length;
                arr.push(this.sports[beg]);
                beg += 1;
            }
            else if (beg < 0) {
                beg = this.sports.length + beg;
                arr.push(this.sports[beg]);
                beg += 1;
            }
        }
        if (this.randomBegin < 0) {
            this.randomBegin = this.sports.length + this.randomBegin;
        }
        else if (this.randomBegin > this.sports.length - 1) {
            this.randomBegin = this.randomBegin - this.sports.length;
        }
        this.randoms = arr;
    };
    // BELOW IS prior to using promises
    // getEvents(): void {
    //   this.events = this.eventService.getEvents()
    // }
    LandingComponent.prototype.sendSport = function (id, name) {
        this.sportService.searchedSportId = id;
        this.sportService.searchedSportName = name;
    };
    LandingComponent.prototype.randomLeft = function () {
        this.randomBegin -= 5;
        if (this.randomBegin < this.sports.length * -1) {
            this.randomBegin = 0;
        }
        this.setRandoms();
    };
    LandingComponent.prototype.randomRight = function () {
        this.randomBegin += 5;
        if (this.randomBegin == this.sports.length) {
            this.randomBegin = 0;
        }
        this.setRandoms();
    };
    return LandingComponent;
}());
LandingComponent = __decorate([
    Component({
        selector: 'app-landing',
        templateUrl: './landing.component.html',
        styleUrls: ['./landing.component.scss']
    }),
    __metadata("design:paramtypes", [EventService, SportService])
], LandingComponent);
export { LandingComponent };
function sortByDateAsc(e1, e2) {
    if (e1.date > e2.date)
        return 1;
    else if (e1.date === e2.date)
        return 0;
    else
        return -1;
}
//# sourceMappingURL=landing.component.js.map