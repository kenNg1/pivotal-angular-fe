import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
// import { AuthenticationService } from './authentication.service'
import { AuthService } from './auth.service'

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  submitted: boolean;
  loginForm: FormGroup;

  constructor(
      private authService: AuthService,
      private formBuilder: FormBuilder
  ){}

  ngOnInit(){
      this.submitted = false;
      this.loginForm = this.formBuilder.group({
          email: ['', Validators.required],
          password: ['', Validators.required]
      })
  }

  submit(value:any){
      console.log(value)
      this.submitted = true
      // if (!this.loginForm.valid){return}
      // REFACTOR LATER
    //   this.authService.logIn(value.email, value.password)

    // FORGET THE BELOW
      // .subscribe(
      //     this.authService.redirectAfterLogin.bind(this.authService),
          // response - *bind* makes sure that "this" in "this.redirectUrl" is referring to the type declared in the auth.service.ts file
          // this.afterFailedLogin.bind(this)
          // error - *bind* binding to this current component, not the service 
      // )
  }

  afterFailedLogin(errors:any){
      let parsed_errors = JSON.parse(errors._body).errors;
      // create a parsed errors variables and looks at the errors bod\y
      for (let attribute in this.loginForm.controls){
          if(parsed_errors[attribute]){
              // if this attribute is inside the parsed errors
              this.loginForm.controls[attribute].setErrors(parsed_errors)
              // then set the rror and display it in the browser
          }
      }
      this.loginForm.setErrors(parsed_errors);        
  }
  
}
