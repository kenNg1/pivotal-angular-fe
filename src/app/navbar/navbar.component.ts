import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'navbar',
    templateUrl: 'navbar.component.html',
    styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent {
    allowButtonClick: boolean = false;
    
    constructor() {
        setTimeout(() => this.allowButtonClick = true, 2000);
    }

    name: string = '';

    onFormInput(event:any){
        this.name = event.target.value;
    }

}
