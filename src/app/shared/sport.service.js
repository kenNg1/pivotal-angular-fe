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
var SportService = (function () {
    function SportService(http) {
        this.http = http;
        this.sportsUrl = 'http://localhost:8000/api/sports'; // URL to web api
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }
    SportService.prototype.getSports = function () {
        return this.http.get(this.sportsUrl)
            .toPromise()
            .then(function (response) {
            console.log(response);
            return response.json();
        })
            .catch(this.handleError);
    };
    // http.get returns an RxJs Observable >> this is then converted into a promise. Parse the resolved json data with the method. as denoted typescript typing
    SportService.prototype.getSport = function (id) {
        var url = this.sportsUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    SportService.prototype.update = function (sport) {
        var url = this.sportsUrl + "/" + sport.id;
        return this.http
            .put(url, JSON.stringify(sport), { headers: this.headers })
            .toPromise()
            .then(function () { return sport; })
            .catch(this.handleError);
    };
    SportService.prototype.create = function (formValues) {
        return this.http
            .post(this.sportsUrl, JSON.stringify(formValues), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    SportService.prototype.delete = function (id) {
        var url = this.sportsUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    SportService.prototype.handleError = function (error) {
        console.log('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return SportService;
}());
SportService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], SportService);
export { SportService };
//# sourceMappingURL=sport.service.js.map