import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AboutusComponent } from '../app/aboutus/aboutus.component';
import { ContactusComponent } from '../app/contactus/contactus.component';
import { PrivacypolicyComponent } from '../app/privacypolicy/privacypolicy.component';
import { TermsconditionsComponent } from '../app/termsconditions/termsconditions.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
  aboutusRef: MatDialogRef<AboutusComponent>;
  contactusRef: MatDialogRef<ContactusComponent>;
  PrivacyPolicyRef: MatDialogRef<PrivacypolicyComponent>;
  TermsConditionsRef: MatDialogRef<TermsconditionsComponent>;

  constructor (private dialog: MatDialog) {}

  onActivate(e,scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  openDialog(file: string): void {
    if(file === 'aboutus') {
    this.aboutusRef = this.dialog.open(AboutusComponent,{
        width: '80%',
        hasBackdrop: true,
        backdropClass: 'backdrop',
        position:{top:'80px'}
    });
  }  else if (file === 'contactus') {
    this.contactusRef = this.dialog.open(ContactusComponent,{
        width: '80%',
        hasBackdrop: true,
        backdropClass: 'backdrop',
        position:{top:'80px'}
  });
  } else if (file === 'privacypolicy') {
    this.PrivacyPolicyRef = this.dialog.open(PrivacypolicyComponent,{
        width: '80%',
        hasBackdrop: true,
        backdropClass: 'backdrop',
        position:{top:'80px'}
  });
} else if (file === 'termsconditions') {
    this.TermsConditionsRef = this.dialog.open(TermsconditionsComponent,{
        width: '80%',
        hasBackdrop: true,
        backdropClass: 'backdrop',
        position:{top:'80px'}
  });
}
}

}
