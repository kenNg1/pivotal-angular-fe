import { Component } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material';
import { AboutusComponent } from '../app/aboutus/aboutus.component';
import { ContactusComponent } from '../app/contactus/contactus.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app'; 
  aboutusRef: MatDialogRef<AboutusComponent>;
  contactusRef: MatDialogRef<ContactusComponent>;

  constructor (private dialog: MatDialog) {}

  onActivate(e,scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

  openDialog(file: string): void {
    if(file === "aboutus") {
    this.aboutusRef = this.dialog.open(AboutusComponent,{
        width: '80%',
        hasBackdrop: true,
        backdropClass: 'backdrop',
        position:{top:'80px'}
    });
  }
  else if (file === "contactus"){
    this.contactusRef = this.dialog.open(ContactusComponent,{
        width: '80%',
        hasBackdrop: true,
        backdropClass: 'backdrop',
        position:{top:'80px'}
  });
}
}

}
