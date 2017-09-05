import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Response, Http } from '@angular/http';
import { Angular2TokenService } from 'angular2-token';
import { Observable } from 'rxjs/Observable'; 
import { User } from './user'
import { DetailService } from './detail.service';

@Injectable()

export class AuthenticationService {
    public token: string;
    resetPasswordToken: string;
    
    redirectUrl: string;
    public currentUser: User;
    public currentUserId: number; 
    public firstName: string;
    public lastName: string;
    public email: string;
    output: any
  
    constructor(
        private tokenService: Angular2TokenService,
        private router: Router,
        private http:Http,
        private detailService: DetailService
    ){
        this.tokenService.init({
            registerAccountPath: 'http://localhost:3000/auth',
            signInPath: 'http://localhost:3000/auth/sign_in',
            validateTokenPath: 'http://localhost:3000/auth/validate_token',
            signOutPath: 'http://localhost:3000/auth/sign_out'
        });
    }

    logIn(email: string, password: string) {
        return this.tokenService.signIn({ 
            email: email,
            password: password
        }).subscribe(
            res => {
                // this.currentUser = <User>res.json().data
                console.log(res)
                this.currentUser = <User>res.json()
                // this.resetPasswordToken      
                console.log(this.currentUser)
                this.router.navigate(['/events'])
            },
            error => { 
                console.log(error);
                return Observable.of(false)
            }
        )
    }

    validate(){
        return this.tokenService.validateToken()
        .map(
            res => {
                this.currentUserId = res.json().data.id
                // console.log(res.json().success)
                // console.log(res.json().data)
                return res.json().data
            },
            error => {
                this.output = error
                return this.output
            }
        )
    }

    // currentuser(){
    //     return this.tokenService.currentUserData;
    // }
    // https://github.com/neroniaky/angular2-token/issues/34

    signUp(email:string, password:string, passwordConfirmation:string){
        this.email = email
        return this.tokenService.registerAccount({
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation
        });
    }
 
    logOut():void{
        this.redirectUrl = undefined;
        this.tokenService.signOut();
        this.router.navigate(['/'])
    }

    isLoggedIn(): boolean {
        return this.tokenService.userSignedIn();
    }
   
    redirectAfterLogin(res,firstName,lastName):void {
        this.detailService.createUserDetail(res, firstName,lastName);
        let redirectTo = this.redirectUrl ? this.redirectUrl: '/'
        this.redirectUrl = undefined;
        this.router.navigate([redirectTo])
    }

    updatePassword(newPassword,newPasswordConfirmation){
        this.tokenService.updatePassword({
            password:             newPassword,
            passwordConfirmation: newPasswordConfirmation,
            // passwordCurrent:      'oldPassword',
            resetPasswordToken:   this.resetPasswordToken
        }).subscribe(
            res =>      console.log(res),
            error =>    console.log(error)
        );
    }
}