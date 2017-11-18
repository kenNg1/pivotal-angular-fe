import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { ActivatedRoute, ParamMap} from '@angular/router';
import { Location, DatePipe } from '@angular/common';
import { SportService } from '../shared/sport.service';
import { DistrictService } from '../shared/district.service';
import { DetailService } from '../user/detail.service';
import { Event } from '../shared/event.model';
import { Detail } from '../shared/detail.model';
import { EventService } from '../shared/event.service';
import 'rxjs/add/operator/switchMap';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { User } from '../user/user';

declare var $:any;

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit, OnDestroy {
  // @Input() event;
  event;
  enableButtons = false;
  registered = false;
  user: User;
  userDetail:Detail;  
  @ViewChild('changeEventModal') target2:any;
  imageId: string;
  // allowButtonClick: boolean = false;
  intensity:string;
  emailHyperlink:any;
  sports:any[] = [];
  address: string;
  levels:any;
  beginners: true;
  beginner = false;
  intermediate = false;
  advanced = false;
  private subscription: any;
  cloudinaryImage:string;
  districts:any[] = [];
  randomAvailability = '9/10';
  // tslint:disable-next-line:max-line-length
  randomInfo = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates expedita ipsa voluptatem repellendus dolores dignissimos soluta, maxime accusamus hic quos incidunt error voluptatum doloremque dicta.';

  public ints = [
    {name:'competitive', value:'competitive', display:'Competitive'},
    {name:'friendly', value:'friendly', display:'Friendly'},
    {name:'casual', value:'casual' , display:'Casual'}
  ];

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dfk2numni', uploadPreset: 'aiehynsk' })
  );

  constructor(
    private eventService:EventService,
    private route:ActivatedRoute,
    private location: Location,
    private sportService: SportService,
    private districtService:DistrictService,
    private detailService:DetailService,) {
      this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        const res: any = JSON.parse(response);
        this.imageId = res.public_id;
        this.cloudinaryImage = JSON.parse(response).url;
        return { item, response, status, headers };
      };
      
  }

  upload() {
    this.uploader.uploadAll();
  }

  // full blown Angular docs
  ngOnInit():void {


   this.user = JSON.parse(localStorage.getItem('currentUser'));

   this.subscription = this.route.paramMap
    .switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
    .subscribe(res => {
      this.event = res;
      this.event.time = this.event.time.replace(/:\d\d([ ap]|$)/,'$1');


      if(this.user) {
        if(this.user.email===this.event.User.email || this.user.email === 'alicia@pivotalsport.com') {
          this.enableButtons = true;
        } else if(this.user.tier ==='2' || this.user.tier === '3') {
          this.enableButtons = true;
        }
      }
      this.intensity = this.event.intensity;
      if(Array.isArray(this.event.level)) {
        this.levels = this.event.level;
      }else {
        this.levels = JSON.parse(JSON.stringify(res.level).replace(/"{/g,'["').replace(/}"/g,'"]').replace(/,/g,'","'));
      }
      const str1 = 'mailto:';
      const str2 = this.event.User.email;
      // tslint:disable-next-line:max-line-length
      console.log(this.user);
      this.detailService.getDetail(this.user.id).then(detail => {
        this.userDetail = detail.json();
        console.log(this.userDetail);

        let str3 = '';
        const D = new Date(this.event.date.replace(' ', 'T'));
        const newD = String(D).split(' ').slice(0,4).join(' ');
        if(this.userDetail.contact!=null) {
           // tslint:disable-next-line:max-line-length
           str3 = `?cc=${this.user.email}&?subject=${this.event.User.Detail.firstName}%20is%20joining%20${this.event.name}%20${newD}&body=Hi%20${this.event.User.Detail.firstName}%2C%0D%0A%0D%0AI%27d%20like%20to%20be%20participate%20in%20this%20event.%20My%20details%20are%20below%3A%0D%0A%0D%0AFull-name%3A%20${this.userDetail.firstName + this.userDetail.lastName}%0D%0AEmail%3A%20${this.user.email}%0D%0ATel%3A%20${this.userDetail.contact}%0D%0A%0D%0AThanks%2C%0D%0A%0D%0A${this.userDetail.firstName}`;
        } else {
          // tslint:disable-next-line:max-line-length
          str3 = `?subject=The%20subject%20of%20the%20email&body=Hi%20${this.event.User.Detail.firstName}%2C%0D%0A%0D%0AI%27d%20like%20to%20be%20participate%20in%20this%20event.%20My%20details%20are%20below%3A%0D%0A%0D%0AFull-name%3A%20${this.userDetail.firstName + this.userDetail.lastName}%0D%0AEmail%3A%20${this.user.email}%0D%0A%0D%0A%0D%0AThanks%2C%0D%0A%0D%0A${this.userDetail.firstName}`;
        }

         
         this.emailHyperlink = str1.concat(str2,str3);
     });

     
      if(this.event.usersJoined.indexOf(this.user.id)===-1) {
        this.registered = false;
      } else {
        this.registered = true;
      }

    });
      this.sportService.getSports().then(sports => {
      this.sports = sports;});
    this.districtService.getDistricts().then(districts => {
      this.districts = districts;
    });
  }

  
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  
  signUp() {
    alert('Please sign up or register first!');
  }

  saveEvent(formValues:any):void {
    console.log(formValues);
    const newForm = formValues;
    newForm.level = this.levelArray();
    this.closeForm();
    this.eventService.update(newForm).then(event=> {
      this.event = event;
      this.address = this.event.address;
      this.levels = event.level;
    });
  }

  

  saveAttendee():void {
    console.log(this.event.usersJoined);
    if(this.event.usersJoined.indexOf(this.user.id)===-1) {
      const newForm:any = {};
      newForm.id = this.event.id;
      this.event.usersJoined.push(this.user.id);
      newForm.level = this.event.level;
      newForm.usersJoined = this.event.usersJoined;
      console.log(newForm);
      this.eventService.update(newForm).then(event=> {
      this.event = event;
    });
    } else {
      console.log('already registered');
    }

  }

  toggleBeginner() {
    this.beginner = !this.beginner;
  }
  toggleIntermediate() {
    this.intermediate = !this.intermediate;
  }
  toggleAdvanced() {
    this.advanced = !this.advanced;
  }

  levelArray() {
    const arr = [];
    if (this.beginner === true) {
      arr.push('beginner');
    }
    if (this.intermediate === true) {
      arr.push('intermediate');
    }
    if (this.advanced === true) {
      arr.push('advanced');
    }
    return arr;
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

  onNavigate(event:Event):void {
    console.log(event);
    let url = '';
    if (!/^http[s]?:\/\//.test(event.Sport.sportsExternalUrl)) {
        url += 'http://';
    }
    url += event.Sport.sportsExternalUrl;
    console.log(url);
    window.open(url, '_blank');
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
