import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { EmailService } from '../shared/email.service';

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

  constructor(private email: EmailService) { }

  ngOnInit() {
  }

  async sendemail(from: string, to: string, subject: string, message: string) {
    try {
      await this.email.sendMail(from, to, subject, message);

      alert('The request has been sent! Thank you !');
  } catch (error) {
    alert('Oups, it doesnt work, please retry or send an email to johann@pivotalsport.com mentionning this issue');
  }
  }
}
