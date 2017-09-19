import { Component, OnInit, state, style,animate,transition, trigger, keyframes } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { DetailService } from '../detail.service';
import { Detail } from '../../shared/detail.model';

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

  constructor(private authService: AuthService, private detailService:DetailService, private router:Router) { }
  id:number;
  userDetail:Detail;
  ngOnInit() {
          // REFACTOR later
        this.id = JSON.parse(localStorage.getItem('currentUser')).id;
        this.detailService.getDetail(this.id).then(detail => {
                    //  this.id = detail.json().id
                     this.userDetail = detail.json();
                    //  console.log(this.userDetail.image)
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
          });
  }

// Javascript to show placeholder "New Password"

}
