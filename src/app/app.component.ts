import { Component } from '@angular/core';
import { EventService } from './shared/event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [EventService]
})
export class AppComponent {
  title = 'app';
}
  