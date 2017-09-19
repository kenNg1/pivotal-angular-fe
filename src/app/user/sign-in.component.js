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
import { FormBuilder, Validators } from '@angular/forms';
// import { AuthenticationService } from './authentication.service'
import { AuthService } from './auth.service';
import { User } from './user';
import { Router } from '@angular/router';
var SignInComponent = (function () {
    function SignInComponent(router, authService, formBuilder) {
        this.router = router;
        this.authService = authService;
        this.formBuilder = formBuilder;
        this.user = new User;
    }
    SignInComponent.prototype.ngOnInit = function () {
        this.submitted = false;
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
    };
    SignInComponent.prototype.submit = function (value) {
        var _this = this;
        console.log('form values', value);
        this.submitted = true;
        // if (!this.loginForm.valid){return}
        // REFACTOR LATER
        this.user.username = value.username;
        this.user.password = value.password;
        this.authService.loginUser(this.user).subscribe(function (res) {
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
        // .subscribe(
        //     this.authService.redirectAfterLogin.bind(this.authService),
        // response - *bind* makes sure that "this" in "this.redirectUrl" is referring to the type declared in the auth.service.ts file
        // this.afterFailedLogin.bind(this)
        // error - *bind* binding to this current component, not the service 
        // )
    };
    return SignInComponent;
}());
SignInComponent = __decorate([
    Component({
        selector: 'app-sign-in',
        templateUrl: './sign-in.component.html',
        styleUrls: ['./sign-in.component.scss']
    }),
    __metadata("design:paramtypes", [Router, AuthService, FormBuilder])
], SignInComponent);
export { SignInComponent };
//# sourceMappingURL=sign-in.component.js.map