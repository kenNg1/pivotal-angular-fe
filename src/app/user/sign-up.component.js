var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
// import { AuthenticationService } from './authentication.service'
import { User } from './user';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
var SignUpComponent = (function () {
    function SignUpComponent(router, authService, formBuilder) {
        this.router = router;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.user = new User;
    }
    SignUpComponent.prototype.ngOnInit = function () {
        this.submitted = false;
        // this.signupForm = this.formBuilder.group({
        //     email: ['', Validators.required],
        //     password: ['', Validators.required],
        //     passwordConfirmation: ['', Validators.required]
        // })
    };
    SignUpComponent.prototype.submit = function (value) {
        var _this = this;
        this.submitted = true;
        this.user.email = value.email;
        this.user.username = value.username;
        this.user.password = value.password;
        this.user.firstName = value.firstName;
        this.user.lastName = value.lastName;
        //   if (!this.signupForm.valid){return}
        // REFACTOR LATER
        this.authService.registerUser(this.user).subscribe(function (res) {
            console.log('response', res);
            _this.user_status = res['success'];
            if (res['ok'] == false) {
                _this.message = res['message'];
                console.log('message', _this.message);
            }
            else {
                // this.authService.setUser(res['user']);
                _this.router.navigate(['/events']);
            }
        });
        // FORGET THE BELOW
        // response - *bind* makes sure that "this" in "this.redirectUrl" is referring to the type declared in the auth.service.ts file
        // this.afterFailedSignup.bind(this)
        // error - *bind* binding to this current component, not the service 
    };
    SignUpComponent.prototype.afterFailedSignup = function (errors) {
        var parsed_errors = JSON.parse(errors._body).errors;
        // create a parsed errors variables and looks at the errors body
        for (var attribute in this.signupForm.controls) {
            if (parsed_errors[attribute]) {
                // if this attribute is inside the parsed errors
                this.signupForm.controls[attribute].setErrors(parsed_errors);
                // then set the rror and display it in the browser
            }
        }
        this.signupForm.setErrors(parsed_errors);
    };
    SignUpComponent.prototype.fetchId = function (id) {
        this.id = id;
    };
    return SignUpComponent;
}());
SignUpComponent = __decorate([
    Component({
        selector: 'app-sign-up',
        templateUrl: './sign-up.component.html',
        styleUrls: ['./sign-up.component.scss']
    }),
    __metadata("design:paramtypes", [Router, AuthService, FormBuilder])
], SignUpComponent);
export { SignUpComponent };
//# sourceMappingURL=sign-up.component.js.map