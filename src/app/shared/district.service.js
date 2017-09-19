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
var DistrictService = (function () {
    function DistrictService(http) {
        this.http = http;
        this.districtUrl = 'http://localhost:8000/api/districts'; // URL to web api
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }
    DistrictService.prototype.getDistricts = function () {
        return this.http.get(this.districtUrl)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    // http.get returns an RxJs Observable >> this is then converted into a promise. Parse the resolved json data with the method. as denoted typescript typing
    DistrictService.prototype.getDistrict = function (id) {
        var url = this.districtUrl + "/" + id;
        return this.http.get(url)
            .toPromise()
            .then(function (response) { return response.json().data; })
            .catch(this.handleError);
    };
    DistrictService.prototype.update = function (district) {
        var url = this.districtUrl + "/" + district.id;
        return this.http
            .put(url, JSON.stringify(district), { headers: this.headers })
            .toPromise()
            .then(function () { return district; })
            .catch(this.handleError);
    };
    DistrictService.prototype.create = function (formValues) {
        return this.http
            .post(this.districtUrl, JSON.stringify(formValues), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    DistrictService.prototype.delete = function (id) {
        var url = this.districtUrl + "/" + id;
        return this.http.delete(url, { headers: this.headers })
            .toPromise()
            .then(function () { return null; })
            .catch(this.handleError);
    };
    DistrictService.prototype.handleError = function (error) {
        console.log('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return DistrictService;
}());
DistrictService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Http])
], DistrictService);
export { DistrictService };
//# sourceMappingURL=district.service.js.map