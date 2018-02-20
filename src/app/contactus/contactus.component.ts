import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { EmailService } from '../shared/email.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Contact } from '../shared/contact.model';
import { User } from '../user/user';
import { AuthService } from '../user/auth.service';
import { DetailService } from '../user/detail.service';
import { Detail } from '../shared/detail.model';

/*const from = 'postmaster@sandbox5d796cd8475b41b3a6768617c0663a70.mailgun.org';
const to = 'johann.ruffie@gmail.com';
const subject = 'test';
const message = 'blblabla';*/

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {

  contactusForm: FormGroup;
  contactus: Contact;
  userDetail:Detail;
  id:number;
  user:User;

  formErrors = {
    'firstname': '',
    'lastname': '',
    'email': ''
  };

  validationMessages = {
    'firstname': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 2 characters long.',
      'maxlength':     'FirstName cannot be more than 25 characters long.'
    },
    'lastname': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 2 characters long.',
      'maxlength':     'Last Name cannot be more than 25 characters long.'
    },
    'email': {
      'required':      'Email is required.',
      'email':         'Email format is not valid.'
    },
  };

  constructor(private emailsender: EmailService, private fb: FormBuilder, private detailService: DetailService) { 
    this.createForm();
  }

  ngOnInit() {
    /* this.id = JSON.parse(localStorage.getItem('currentUser')).id;
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    
    this.detailService.getDetail(this.id).then(detail => {
                //  this.id = detail.json().id
                 this.userDetail = detail.json();
  }); */
  
  }

  createForm(): void {
    this.contactusForm = this.fb.group({
      firstname: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(25)] ],
      lastname: ['', [Validators.required, , Validators.minLength(2), Validators.maxLength(25)] ],
      email: ['', [Validators.required, Validators.email] ],
      message: ''
    });
    /* this.contactusForm.reset({
      firstname: this.userDetail.firstName,
      lastname: this.userDetail.lastName,
      email: this.user.email,
      message: ''
    });
    this.contactusForm.setValue({
      firstname:'johann',
      lastname: 'ruffie',
      message:'johann@pivotalsport.com'
  }); */
    
    this.contactusForm.valueChanges
    .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.contactusForm) { return; }
    const form = this.contactusForm;
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
    this.contactus = this.contactusForm.value;
    console.log(this.contactus);
    const from = 'postmaster@pivotalsport.com';
    this.emailsender.sendMail({
      from:'postmaster@pivotalsport.com',
      to:'johann.ruffie@gmail.com',
      name:'Testsubject',
      text:'ca marche yep'})
      .subscribe(data => console.log('ca marche'+ data),
      err => console.log(err));
    this.contactusForm.reset({
      firstname: '',
      lastname: '',
      email: '',
      message: ''
    });
  }

  /* async sendemail(from: string, to: string, subject: string, message: string) {
    try {
      await this.emailsender.sendMail(from, to, subject, message);

      alert('The request has been sent! Thank you !');
  } catch (error) {
    alert('Oups, it doesnt work, please retry or send an email to johann@pivotalsport.com mentionning this issue');
  }
  }
  
  sendemail('info@pivotalsport.com','johann.ruffie@gmail.com','Testsubject','ca marche')
  */
}
