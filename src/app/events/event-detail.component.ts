import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location } from '@angular/common';
import { SportService } from '../shared/sport.service';
import { DistrictService } from '../shared/district.service';

import { Event } from '../shared/event.model';
import { EventService } from '../shared/event.service';
import 'rxjs/add/operator/switchMap';

declare var $:any;

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  // @Input() event;
  event:any;
  @ViewChild('changeEventModal') target2:any;
  
  // allowButtonClick: boolean = false;
  intensity:string;
  emailHyperlink:any;
  sports:any[] = [];  
  private subscription: any;
  
  districts:any[] = [];

  randomAvailability = '9/10';
  // tslint:disable-next-line:max-line-length
  randomInfo = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates expedita ipsa voluptatem repellendus dolores dignissimos soluta, maxime accusamus hic quos incidunt error voluptatum doloremque dicta.';

  public ints = [
    {name:'competitive', value:'competitive', display:'Competitive'},
    {name:'friendly', value:'friendly', display:'Friendly'},
    {name:'casual', value:'casual' , display:'Casual'}
  ];

  constructor(
    private eventService:EventService, private route:ActivatedRoute,
    private location: Location, private sportService: SportService,
    private districtService:DistrictService) {    
  }
  
  // full blown Angular docs
  ngOnInit():void {
   this.subscription = this.route.paramMap
    .switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
    .subscribe(res => {
      console.log(res);      
      this.event = res;      
      window.scrollTo(0, 0);
      this.intensity = this.event.intensity;
      const str1 = 'mailto:';
      const str2 = this.event.User.email;
      const str3 = '?subject=The%20subject%20of%20the%20email&body=Yes%20I%20wanna%20go%20dude';
      this.emailHyperlink = str1.concat(str2,str3);     
      console.log(this.emailHyperlink); 
    });
      this.sportService.getSports().then(sports => {
      this.sports = sports;});
    this.districtService.getDistricts().then(districts => {
      this.districts = districts;});
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  saveEvent(formValues:any):void {
    // console.log(document.querySelectorAll('[data-name="intensity"]'))
    console.log(formValues);
    this.closeForm();    
    this.eventService.update(formValues).then(event=> {
      console.log('response',event);
      this.event = event;
    });
  }

  showForm(): void {
    window.scrollTo(0, 0);
    $('.modal').show();
    this.target2.nativeElement.scrollTop=0;
  }

  closeForm(): void {
    window.scrollTo(0, 0);        
    $('.modal').hide();
  }

  goBack():void {
    window.scrollTo(0, 0);            
    this.location.back();
  }

  delete(event:Event):void {
    this.eventService.delete(event.id)
      .then(()=> {
        this.goBack();
      });
  }

  // checkIntensity(intensity:string){
  //   this.event.intensity == intensity ? true : false;
  // }
  
  // v1 implementation of promises - didn't work
  // ngOnInit():void {
  //   this.eventService.getEvent(+this.route.snapshot.params['id']).then(event => this.event = event)
  // }

  // tslint:disable-next-line:max-line-length
  // http://cms.acceleratedhk.com/angular/08-routing/01-routing.html tells you about downsides of snapshot. snapshot seems to be simpler BUT the main issue is if you are navigating from e.g. DepartmentDetailComponent back to DepartmentListComponent, the value is not going to be updated for this.route.snapshot.params['id']. Therefore, please use the observable way which is safer way to guarantee that the values of the param are already up-to-date.
  
  // original working w/o promises
  // ngOnInit():void {
  //   this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  // }

}

