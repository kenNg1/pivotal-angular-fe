import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthenticationService } from './authentication.service'
import { AuthService } from './auth.service';
import { User } from './user';
import { Router } from '@angular/router';
import { Location} from '@angular/common';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})

export class SignInComponent implements OnInit {
  submitted: boolean;

  loginForm: FormGroup;
  message: String;
  user: User;
  user_status: boolean;
  err: String = '';

  constructor( private router: Router,
    private authService: AuthService, private formBuilder: FormBuilder,private _location: Location) {
      this.user = new User;
  }

  ngOnInit() {
      this.submitted = false;
      this.loginForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });
  }

  submit(value:any) {
      this.submitted = true;
      // if (!this.loginForm.valid){return}
      // REFACTOR LATER
      this.user.username = value.username;
      this.user.password = value.password;

      this.authService.loginUser(this.user).subscribe(res=> {
          console.log('response',res);
          this.user_status = res['success'];
          console.log(res);
          if(res['ok'] === false) {
            this.message = res['message'];
            console.log('message',this.message);
          } else {
            // this.authService.setUser(res['user']);
            this._location.back();
          }
      }, error => {
        this.err = 'Email or password does not match';
      }
    );

    // FORGET THE BELOW
      // .subscribe(
      //     this.authService.redirectAfterLogin.bind(this.authService),
          // response - *bind* makes sure that "this" in "this.redirectUrl" is referring to the type declared in the auth.service.ts file
          // this.afterFailedLogin.bind(this)
          // error - *bind* binding to this current component, not the service
      // )
  }

//   afterFailedLogin(errors:any){
//       let parsed_errors = JSON.parse(errors._body).errors;
//       // create a parsed errors variables and looks at the errors bod\y
//       for (let attribute in this.loginForm.controls){
//           if(parsed_errors[attribute]){
//               // if this attribute is inside the parsed errors
//               this.loginForm.controls[attribute].setErrors(parsed_errors)
//               // then set the rror and display it in the browser
//           }
//       }
//       this.loginForm.setErrors(parsed_errors);
//   }

}
