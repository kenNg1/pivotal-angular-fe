var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
var EventService = (function () {
    function EventService(http) {
        this.http = http;
        this.eventsUrl = 'http://localhost:8000/api/events'; // URL to web api
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }
    EventService.prototype.getEvents = function () {
        return this.http.get(this.eventsUrl)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    // http.get returns an RxJs Observable >> this is then converted into a promise. Parse the resolved json data with the method. as denoted typescript typing
    EventService.prototype.getEvent = function (id) {
        var url = this.eventsUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    EventService.prototype.getLatLong = function (address) {
        var url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyDShUCLIVGmRpvGiyEIQOdpDo54gD6tQBw";
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EventService.prototype.update = function (event) {
        var url = this.eventsUrl + "/" + event.id;
        return this.http
            .put(url, JSON.stringify(event), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response.json(); })
            .catch(this.handleError);
    };
    EventService.prototype.create = function (formValues) {
        console.log(formValues);
        return this.http
            .post(this.eventsUrl, JSON.stringify(formValues), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    EventService.prototype.delete = function (id) {
        var url = this.eventsUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    EventService.prototype.handleError = function (error) {
        console.log('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return EventService;
}());
EventService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], EventService);
export { EventService };
//# sourceMappingURL=event.service.js.map