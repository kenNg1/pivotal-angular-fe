import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { AuthenticationService } from './authentication.service'
import { User } from './user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  submitted: boolean;
  signupForm: FormGroup;
  user: User;
  id:number;
  
  user_status: boolean;
  message: String;

  constructor(private router: Router,public authService: AuthService, private formBuilder: FormBuilder) {
      this.user = new User;
    }


  ngOnInit() {
      this.submitted = false;
      // this.signupForm = this.formBuilder.group({
      //     email: ['', Validators.required],
      //     password: ['', Validators.required],
      //     passwordConfirmation: ['', Validators.required]
      // })
  }

  submit(value:any) {
      this.submitted = true;
      this.user.email = value.email;
      this.user.username = value.username;
      this.user.password = value.password;
      this.user.firstName = value.firstName;
      this.user.lastName = value.lastName;
    //   if (!this.signupForm.valid){return}

        // REFACTOR LATER
          this.authService.registerUser(this.user).subscribe(res=> {
            console.log('response',res);
            this.user_status = res['success'];
            if(res['ok'] === false) {
              this.message = res['message'];
              console.log('message',this.message);
            } else {
              // this.authService.setUser(res['user']);
              this.router.navigate(['/events']);
            }

        });

        // FORGET THE BELOW
          // response - *bind* makes sure that "this" in "this.redirectUrl" is referring to the type declared in the auth.service.ts file
          // this.afterFailedSignup.bind(this)
          // error - *bind* binding to this current component, not the service

  }

  afterFailedSignup(errors:any) {
      const parsed_errors = JSON.parse(errors._body).errors;
      // create a parsed errors variables and looks at the errors body
      for (const attribute in this.signupForm.controls) {
          if(parsed_errors[attribute]) {
              // if this attribute is inside the parsed errors
              this.signupForm.controls[attribute].setErrors(parsed_errors);
              // then set the rror and display it in the browser
          }
      }
      this.signupForm.setErrors(parsed_errors);
  }

  fetchId(id:number) {
      this.id = id;
  }
}
