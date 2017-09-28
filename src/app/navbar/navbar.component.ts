import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
// import { AuthenticationService } from '../user/authentication.service'
import { AuthService } from '../user/auth.service';
import { SportService } from '../shared/sport.service';

import { User } from '../user/user';
import { Subscription } from 'rxjs/Subscription';

import { AsyncLocalStorage } from 'angular-async-local-storage';

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
import { Event } from '../shared/event.model';

// end of search-as-you-type

@Component({
    moduleId: module.id, 
    // tslint:disable-next-line:component-selector
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit, OnDestroy {

    @ViewChild('searchBox') target:any;

    allowButtonClick =false;
    name = '';
    subscription: Subscription;
    message: String;
    user: User;
    events: Observable<Event[]>;
    sports:any[] = [];
    private searchTerms = new Subject<string>();

    constructor(private router: Router, private sportSearchService: SportSearchService, 
        private authService: AuthService, private sportService: SportService) {
        setTimeout(() => this.allowButtonClick = true, 500);

        // this.subscription = authService.user$.subscribe((user)=> {return this.user=user} )
        // this.authService.verify().subscribe((res)=>this.message = res['message'])
        
    } 

    // to enable search-as-you-type
    ngOnInit():void {
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        // example of verification
        this.authService.verify().subscribe((res)=>this.message = res['message']);

        this.events = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => 
                term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.sportSearchService.search(term).toPromise().then(res=> {
                    this.sports = res.sports;
                    return res.events;})
                // or the observable of empty events if there was no search term
                : Observable.of<Event[]>([])
            )
            .catch(error => {
                // TODO: add real error handling
                return Observable.of<Event[]>([]);
            });
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        console.log('destroy');
        this.subscription.unsubscribe();
    }

    logOut():void {
        this.authService.logout();
        this.user = null;
        this.message = 'Logged out';
        this.router.navigate(['/']);
    }

    // VERSION 1 Authentication
    isLoggedIn() {
        return !!this.user || this.authService.loggedIn; 
    }
    // isLoggedOut():boolean{
    //     return !this.authService.isLoggedIn(); 
    // } 
    // checking(){
    //     // console.log(this.authService.validate())
    //     console.log(this.authService.currentUser)
    // }

    onFormInput(event:any) {
        this.name = event.target.value;
    }

    gotoResults(): void {
        this.router.navigate(['/search']);
    }

    sendSports(id:number,name:string) {
        this.sportService.searchedSportId = id;
        this.sportService.searchedSportName = name;
        this.router.navigate(['/search']); 
      } 

    search(term:string):void {
        this.searchTerms.next(term);
        this.sports=[];
    }

    gotoDetail(event:Event): void {
        // this.events = Observable.of<Event[]>([]);
        // this.sports=[];        
        this.router.navigate(['/events',event.id]);
    }

    onFocusMethod(): void {
        console.log(this.sportService.searchedSportId);
        console.log(this.sportService.searchedSportName);
    }

    onBlurMethod(): void {
            const ev = new KeyboardEvent('keyup',{ 'key': 'Enter'});
            this.target.nativeElement.value = '';            
            this.target.nativeElement.dispatchEvent(ev);
    }

}
