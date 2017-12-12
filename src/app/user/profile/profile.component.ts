

import { Component, OnInit, state, style,animate,transition, trigger, keyframes } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DetailService } from '../detail.service';
import { Detail } from '../../shared/detail.model';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { User } from '../user';

declare var $:any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [
    trigger('carduserprofile', [
        state('*', style({
            '-ms-transform': 'translate3D(0px, 0px, 0px)',
            '-webkit-transform': 'translate3D(0px, 0px, 0px)',
            '-moz-transform': 'translate3D(0px, 0px, 0px)',
            '-o-transform':'translate3D(0px, 0px, 0px)',
            transform:'translate3D(0px, 0px, 0px)',
            opacity: 1
        })),
        transition('void => *', [
            style({opacity: 0,
                '-ms-transform': 'translate3D(0px, 150px, 0px)',
                '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                '-moz-transform': 'translate3D(0px, 150px, 0px)',
                '-o-transform':'translate3D(0px, 150px, 0px)',
                transform:'translate3D(0px, 150px, 0px)',
            }),
            animate('0.3s 0s ease-out'),
        ])
    ]),
    trigger('cardprofile', [
        state('*', style({
            '-ms-transform': 'translate3D(0px, 0px, 0px)',
            '-webkit-transform': 'translate3D(0px, 0px, 0px)',
            '-moz-transform': 'translate3D(0px, 0px, 0px)',
            '-o-transform':'translate3D(0px, 0px, 0px)',
            transform:'translate3D(0px, 0px, 0px)',
            opacity: 1})),
            transition('void => *', [
                style({opacity: 0,
                    '-ms-transform': 'translate3D(0px, 150px, 0px)',
                    '-webkit-transform': 'translate3D(0px, 150px, 0px)',
                    '-moz-transform': 'translate3D(0px, 150px, 0px)',
                    '-o-transform':'translate3D(0px, 150px, 0px)',
                    transform:'translate3D(0px, 150px, 0px)',
                }),
                animate('0.3s 0.25s ease-out')
            ])
        ])
    ]
})
export class ProfileComponent implements OnInit {

  constructor(private authService: AuthService, private detailService:DetailService, private router:Router) {
    
    this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any): any => {
        const res: any = JSON.parse(response);
        this.imageId = res.public_id;
        this.cloudinaryImage = JSON.parse(response).url;
        $('.show-file').show();
        console.log(this.cloudinaryImage);
        return { item, response, status, headers };
      };
  }
  enableButtons = false;  
  id:number;
  userDetail:Detail;
  cloudinaryImage:string;
  imageId: string;
  user: User;

  uploader: CloudinaryUploader = new CloudinaryUploader(
    new CloudinaryOptions({ cloudName: 'dfk2numni', uploadPreset: 'aiehynsk' })
  );
  
  routerCanDeactivate() {
    return false; // false stops navigation, true continue navigation
  }

  upload() {
    this.uploader.uploadAll();
  }

  ngOnInit() {
          // REFACTOR later
        this.id = JSON.parse(localStorage.getItem('currentUser')).id;
        this.user = JSON.parse(localStorage.getItem('currentUser'));
        
        this.detailService.getDetail(this.id).then(detail => {
                    //  this.id = detail.json().id
                     this.userDetail = detail.json();
                    //  console.log(this.userDetail.image)
                    if(this.user) {
                        if(this.user.email === 'alicia@pivotalsport.com' || this.user.email === 'johann.ruffie@gmail.com') {
                          this.enableButtons = true;
                        } else if(this.user.tier ==='2' || this.user.tier === '3') {
                          this.enableButtons = true;
                        }
                      }
                 });
        // this.authService.validate().subscribe(value=>{
        //     this.detailService.getDetail(value.id).then(detail => {
        //         this.id = detail.json().id
        //         this.userDetail = detail.json()
        //         console.log(this.userDetail.image)
        //     })
        // })
  }



  submit(formValues:any) {
      console.log(formValues);
      this.detailService.updateUserDetail(formValues).then(
          response=> {
            this.userDetail = response.json();
            if(formValues.email) {
                localStorage.setItem('currentUser', JSON.stringify({ 
                    email: formValues.email 
                  }));
            }
            alert('Changes saved!');
          });
  }

  gotoUsers(): void {
    this.router.navigate(['/admin/user-approval']);
    }

// Javascript to show placeholder "New Password"

}
