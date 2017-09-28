import { Component, OnInit } from '@angular/core';
import { Event } from '../shared/event.model';
import { EventService } from '../shared/event.service';
import { Router } from '@angular/router';
import { Sport } from '../shared/sport.model';
import { SportService } from '../shared/sport.service';
import { District } from '../shared/district.model';
import { User } from '../user/user';
import { DistrictService } from '../shared/district.service';
// import { AuthenticationService } from "../user/authentication.service";
import { AuthService } from '../user/auth.service';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';


@Component({
  selector: 'app-new-event',
  templateUrl: './new-event.component.html',
  styleUrls: ['./new-event.component.scss']
})
export class NewEventComponent implements OnInit {
  sports:any[] = [];
  districts:any[] = [];
  userId:number;
  user: User;
  beginner = false;
  intermediate = false;  
  advanced = false;
  selectedSport = false;
  selectedDistrict = false;
  submitButtonClicked = false;
  
  cloudinaryImage:string;
  imageId: string;    

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dfk2numni', uploadPreset: 'aiehynsk' })
  );

  toggleBeginner() {
    this.beginner = !this.beginner;
  }
  toggleIntermediate() {
    this.intermediate = !this.intermediate;
  }
  toggleAdvanced() {
    this.advanced = !this.advanced;
  }
  selectSport() {
    this.selectedSport = true ;
  }
  selectDistrict() {
    this.selectedDistrict = true;
  }
  selectSubmit() {
    this.submitButtonClicked = true;
  }

  constructor(private eventService:EventService, 
    private router:Router,
    private sportService:SportService, 
    private districtService:DistrictService,
    private authService: AuthService,
  ) {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.imageId = res.public_id;
      this.cloudinaryImage = JSON.parse(response).url;
      return { item, response, status, headers };
    };
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    this.sportService.getSports().then(sports => {
      this.sports = sports;
    });
    this.districtService.getDistricts().then(districts => {
      this.districts = districts;
    });
  }

  upload() {
    this.uploader.uploadAll();
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

  add(formValues:any) {
    const newForm = formValues;
    newForm.level = this.levelArray();
    this.eventService.create(newForm)
      .then((event) => {
        this.router.navigate(['/events']);
      });
  }

  closeForm(): void {
    window.scrollTo(0, 0);        
    this.router.navigate(['/events']);
  }

}
