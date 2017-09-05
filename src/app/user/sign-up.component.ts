import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { AuthenticationService } from './authentication.service'

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})

export class SignUpComponent implements OnInit {
  submitted: boolean;
  signupForm: FormGroup;
  id:number;

  constructor(
      private authService: AuthenticationService,
      private formBuilder: FormBuilder
  ){}

  
  ngOnInit(){
      this.submitted = false;
      // this.signupForm = this.formBuilder.group({
      //     email: ['', Validators.required],
      //     password: ['', Validators.required],
      //     passwordConfirmation: ['', Validators.required]
      // })
  }

  submit(value:any){
      console.log(value)
      this.submitted = true
      // if (!this.signupForm.valid){return}
      console.log(value.email, value.password, value.passwordConfirmation)
      this.authService.signUp(value.email, value.password, value.passwordConfirmation).subscribe(
        res => this.authService.redirectAfterLogin.apply(this.authService,[res, value.firstName,value.lastName])
          // response - *bind* makes sure that "this" in "this.redirectUrl" is referring to the type declared in the auth.service.ts file
          // this.afterFailedSignup.bind(this)
          // error - *bind* binding to this current component, not the service 
      )
  }

  afterFailedSignup(errors:any){
      let parsed_errors = JSON.parse(errors._body).errors;
      // create a parsed errors variables and looks at the errors body
      for (let attribute in this.signupForm.controls){
          if(parsed_errors[attribute]){
              // if this attribute is inside the parsed errors
              this.signupForm.controls[attribute].setErrors(parsed_errors)
              // then set the rror and display it in the browser
          }
      }
      this.signupForm.setErrors(parsed_errors);        
  }

  fetchId(id){
      this.id = id
  }
}