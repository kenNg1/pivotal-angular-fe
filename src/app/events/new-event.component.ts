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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';



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
  newForm;
  levelchecked:string[]=[];

  cloudinaryImage = '';
  imageId: string;
  

  level = [
    { level: 'beginner' },
    { level: 'intermediate' },
    { level: 'advanced' }
    ];

  newEventForm: FormGroup;
  formErrors = {
    'name': '',
    'description':'',
    'org_description':'',
    'sportswear':'',
    'max_ppl':'',
    'sport_id': '',
    'district_id':'',
    'level':'',
    /*'intensity':'',
    'terrain':'',*/
    'price':'',
    'imageUpload':'',
    'date':'',
    'time':'',
    'length':'',
    'address':'' 
  };
  validationMessages = {
    'name': {
      'required':      'Event name is required.',
      'minlength':     'Event name must be at least 2 characters long.',
      'maxlength':     'Event name cannot be more than 25 characters long.'
    },
    'description': {
      'required':      'Event description is required.',
    },
    'org_description': {
      'required':      'Organizer information is required.',
    },
    'sportswear': {
      'required':      'Sport equipment is required.',
    },
    'max_ppl': {
      'required':      'Spaces available is required.',
    },
    'sport_id': {
      'required':      'Sport is required.',
    },
    'district_id': {
      'required':      'District is required.',
    },
    'level': {
      'required':      'Please select at least one level.',
    },
    /*'intensity': {
      'required':      'Sport is required.',
    },
    'terrain': {
      'required':      'Sport is required.',
    },*/
    'price': {
      'required':      'Price is required.',
    },
    'imageUpload': {
      'required':      'Image is required.',
    },
    'date': {
      'required':      'Date is required.',
    },
    'time': {
      'required':      'Time is required.',
    },
    'length': {
      'required':      'Length is required.',
    },
    'address': {
      'required':      'Address is required.',
    } 
  };

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

  toggleLevel(checked) {
    const position = this.levelchecked.indexOf(checked);
    if (position !== -1) {
        this.levelchecked.splice(position,1);
    } else {
      this.levelchecked.push(checked);
    }
  }

  constructor(private eventService:EventService, 
    private router:Router,
    private sportService:SportService, 
    private districtService:DistrictService,
    private authService: AuthService,
    private fb: FormBuilder
  ) {
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
      const res: any = JSON.parse(response);
      this.imageId = res.public_id;
      this.cloudinaryImage = JSON.parse(response).url;
      return { item, response, status, headers };
    };
    this.createForm();
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


  createForm(): void {
    this.newEventForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      description: ['', [Validators.required] ],
      org_description: ['', [Validators.required] ],
      max_ppl: ['', [Validators.required] ],
      sportswear: ['', [Validators.required] ],
      org_website: '',
      sport_id : ['', [Validators.required] ],
      district_id: ['', [Validators.required] ],
      user_id : '',
      level: '' ,
      /*intensity: ['', [Validators.required] ],
      terrain: ['', [Validators.required] ],*/
      price: ['', [Validators.required] ],
      imageUpload: '',
      date: ['', [Validators.required] ],
      time: ['', [Validators.required] ],
      length: ['', [Validators.required] ],
      address: ['', [Validators.required] ]
    });
    this.newEventForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.newEventForm) { return; }
    const form = this.newEventForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (control.errors.hasOwnProperty(key)) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
    }
  }


  onSubmit() {
    this.add(this.newEventForm.value);
    this.newEventForm.reset({
      name: '',
    });
  }

  upload() {
    this.uploader.uploadAll();
  }

  // levelArray() {
  //   const arr = [];
  //   if (this.beginner === true) {
  //     arr.push('beginner');
  //   }
  //   if (this.intermediate === true) {
  //     arr.push('intermediate');
  //   }
  //   if (this.advanced === true) {
  //     arr.push('advanced');
  //   }
  //   return arr;
  // }

  add(formValues:any) {
    this.newForm = formValues;
    this.newForm.level = this.levelchecked;
    // this.newForm.level = this.levelArray();
    this.newForm.user_id = this.user.id;
    // this.newForm.user_id = this.user.id;
    this.eventService.create(this.newForm)
      .then((event) => {
        // this.router.navigate(['/events', event.id.toString()]);
        this.router.navigate(['']);
      });
  }

  closeForm(): void {
    window.scrollTo(0, 0);        
    this.router.navigate(['']);
  }

}
