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
// import { AuthenticationService } from '../user/authentication.service'
import { AuthService } from '../user/auth.service';
import { Router } from '@angular/router';
// to enable search-as-you-type
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// Observable class extensions
import 'rxjs/add/observable/of';
// Observable operators
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { SportSearchService } from '../search/sport-search.service';
// end of search-as-you-type
var NavbarComponent = (function () {
    function NavbarComponent(router, sportSearchService, authService) {
        var _this = this;
        this.router = router;
        this.sportSearchService = sportSearchService;
        this.authService = authService;
        this.allowButtonClick = false;
        this.name = '';
        this.sports = [];
        this.searchTerms = new Subject();
        setTimeout(function () { return _this.allowButtonClick = true; }, 500);
        // this.subscription = authService.user$.subscribe((user)=> {return this.user=user} )
        // this.authService.verify().subscribe((res)=>this.message = res['message'])
    }
    // to enable search-as-you-type
    NavbarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        //example of verification
        this.authService.verify().subscribe(function (res) { return _this.message = res['message']; });
        this.events = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged() // ignore if next search term is same as previous
            .switchMap(function (term) {
            return term // switch to new observable each time the term changes
                ? _this.sportSearchService.search(term).toPromise().then(function (res) {
                    console.log(res);
                    _this.sports = res.sports;
                    console.log(_this.sports);
                    return res.events;
                })
                : Observable.of([]);
        })
            .catch(function (error) {
            // TODO: add real error handling
            console.log(error);
            return Observable.of([]);
        });
    };
    NavbarComponent.prototype.ngOnDestroy = function () {
        // prevent memory leak when component is destroyed
        console.log('destroy');
        this.subscription.unsubscribe();
    };
    NavbarComponent.prototype.logOut = function () {
        this.authService.logout();
        this.user = null;
        this.message = "Logged out";
        this.router.navigate(['/']);
    };
    // VERSION 1 Authentication
    NavbarComponent.prototype.isLoggedIn = function () {
        return !!this.user || this.authService.loggedIn;
    };
    // isLoggedOut():boolean{
    //     return !this.authService.isLoggedIn(); 
    // } 
    // checking(){
    //     // console.log(this.authService.validate())
    //     console.log(this.authService.currentUser)
    // }
    NavbarComponent.prototype.onFormInput = function (event) {
        this.name = event.target.value;
    };
    NavbarComponent.prototype.gotoResults = function () {
        this.router.navigate(['/search']);
    };
    NavbarComponent.prototype.search = function (term) {
        this.searchTerms.next(term);
        this.sports = [];
    };
    NavbarComponent.prototype.onBlurMethod = function () {
        this.target.nativeElement.value = "";
        var ev = new KeyboardEvent("keyup", {
            "key": "Enter"
        });
        this.target.nativeElement.dispatchEvent(ev);
    };
    NavbarComponent.prototype.gotoDetail = function (event) {
        var link = ['/events', event.id];
        // this.events = Observable.of<Event[]>([]);
        // this.sports=[];        
        this.router.navigate(link);
    };
    return NavbarComponent;
}());
__decorate([
    ViewChild('searchBox'),
    __metadata("design:type", Object)
], NavbarComponent.prototype, "target", void 0);
NavbarComponent = __decorate([
    Component({
        moduleId: module.id,
        selector: 'navbar',
        templateUrl: 'navbar.component.html',
        styleUrls: ['./navbar.component.scss']
    }),
    __metadata("design:paramtypes", [Router, SportSearchService, AuthService])
], NavbarComponent);
export { NavbarComponent };
//# sourceMappingURL=navbar.component.js.map