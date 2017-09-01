import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../user/authentication.service'


// to enable search-as-you-type
import { Observable }        from 'rxjs/Observable';
import { Subject }           from 'rxjs/Subject';
 
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
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {
    allowButtonClick: boolean = false;
    name: string = '';

    events: Observable<Event[]>;
    private searchTerms = new Subject<string>();

    constructor(private router: Router, private sportSearchService: SportSearchService, private authService: AuthenticationService) {
        setTimeout(() => this.allowButtonClick = true, 2000);
    }

    isLoggedIn():boolean{
        return this.authService.isLoggedIn();
    }


    isLoggedOut():boolean{
        return !this.authService.isLoggedIn(); 
    } 

    logOut():void {
        this.authService.logOut();
    }

    checking(){
        // console.log(this.authService.validate())
        console.log(this.authService.currentUser)
    }

    onFormInput(event:any){
        this.name = event.target.value;
    }

    gotoResults(): void{
        this.router.navigate(['/search'])
    }

// to enable search-as-you-type
    ngOnInit():void{
        this.events = this.searchTerms
            .debounceTime(300) // wait 300ms after each keystroke before considering the term
            .distinctUntilChanged()   // ignore if next search term is same as previous
            .switchMap(term => term   // switch to new observable each time the term changes
                // return the http search observable
                ? this.sportSearchService.search(term)
                // or the observable of empty events if there was no search term
                : Observable.of<Event[]>([]))
            .catch(error => {
                // TODO: add real error handling
                console.log(error);
                return Observable.of<Event[]>([]);
            })
    }

    search(term:string):void{
        this.searchTerms.next(term);
    }

    gotoDetail(event:Event): void {
        let link = ['/events',event.id];
        this.router.navigate(link)
    }

//

}
