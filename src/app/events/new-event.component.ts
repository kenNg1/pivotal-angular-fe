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
  beginner: boolean = false;
  intermediate: boolean = false;  
  advanced: boolean = false;
  selectedSport: boolean = false;
  selectedDistrict: boolean = false;
  submitButtonClicked: boolean = false
  
  cloudinaryImage:string;
  imageId: string;    

  toggleBeginner(){
    this.beginner = !this.beginner
  }
  toggleIntermediate(){
    this.intermediate = !this.intermediate
  }
  toggleAdvanced(){
    this.advanced = !this.advanced
  }
  selectSport(){
    this.selectedSport = true 
  }
  selectDistrict(){
    this.selectedDistrict = true
  }
  selectSubmit(){
    this.submitButtonClicked = true
  }

  constructor(private eventService:EventService, 
    private router:Router,
    private sportService:SportService, 
    private districtService:DistrictService,
    private authService: AuthService,
  ) {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      let res: any = JSON.parse(response);
      this.imageId = res.public_id;
      this.cloudinaryImage = JSON.parse(response).url
      console.log(this.cloudinaryImage)
      return { item, response, status, headers };
    }
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

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dfk2numni', uploadPreset: 'aiehynsk' })
  );

  levelArray(){
    let arr = []
    if (this.beginner == true) {
      arr.push('beginner')
    }
    if (this.intermediate == true) {
      arr.push('intermediate')
    }
    if (this.advanced == true) {
      arr.push('advanced')
    }
    return arr
  }

  add(formValues:any) {
    let newForm = formValues;
    newForm.level = this.levelArray()
    console.log(formValues)
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
