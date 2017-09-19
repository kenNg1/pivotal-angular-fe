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
import { Router } from '@angular/router';
import { Headers, Http } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
var DetailService = (function () {
    function DetailService(
        // public firstName:string,
        tokenService, router, http) {
        this.tokenService = tokenService;
        this.router = router;
        this.http = http;
        this.detailsUrl = 'http://localhost:8000/api/details'; // URL to web api
        this.headers = new Headers({ 'Content-Type': 'application/json' });
    }
    DetailService.prototype.getDetails = function () {
        return this.http.get(this.detailsUrl)
            .toPromise()
            .then(function (response) {
            return response.json();
        })
            .catch(this.handleError);
    };
    DetailService.prototype.getDetail = function (id) {
        var url = this.detailsUrl + "/" + id;
        return this.http.get(url)
            .toPromise();
    };
    DetailService.prototype.createUserDetail = function (res, firstName, lastName) {
        console.log(res.json().data.id);
        console.log(firstName);
        console.log(lastName);
        return this.http
            .post(this.detailsUrl, JSON.stringify({
            user_id: res.json().data.id,
            firstName: firstName,
            lastName: lastName,
            tier: 1,
            image: "https://lovelace-media.imgix.net/uploads/999/87d36be0-39a4-0133-8e8d-0e17bac22e39.gif?w=740&h=539&fit=max&auto=format"
        }), { headers: this.headers })
            .toPromise()
            .then(function (res) { return res.json().data; })
            .catch(this.handleError);
    };
    DetailService.prototype.updateUserDetail = function (detail) {
        var url = this.detailsUrl + "/" + detail.user_id;
        return this.http
            .put(url, JSON.stringify(detail), { headers: this.headers })
            .toPromise()
            .then(function (response) { return response; })
            .catch(this.handleError);
    };
    DetailService.prototype.updateUserTier = function (id, tier) {
        var url = this.detailsUrl + "/" + id;
        return this.http
            .put(url, JSON.stringify({
            user_id: id,
            tier: tier
        }), { headers: this.headers })
            .toPromise()
            .then(function (response) {
            return response;
        })
            .catch(this.handleError);
    };
    DetailService.prototype.handleError = function (error) {
        console.log('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    };
    return DetailService;
}());
DetailService = __decorate([
    Injectable(),
    __metadata("design:paramtypes", [Angular2TokenService,
        Router,
        Http])
], DetailService);
export { DetailService };
//# sourceMappingURL=detail.service.js.map