import { Component, OnInit, Input } from '@angular/core'
import { ActivatedRoute, ParamMap} from '@angular/router'
import { Location } from '@angular/common'

import { Event } from '../shared/event.model'
import { EventService } from '../shared/event.service'
import 'rxjs/add/operator/switchMap'

declare var $:any;

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit {
  @Input() event: Event;
  constructor(private eventService:EventService, private route:ActivatedRoute, private location: Location ) { }
  
  // full blown Angular docs
  ngOnInit():void {
   this.route.paramMap
    .switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
    .subscribe(event => this.event = event)
  }

  randomAvailability = "9/10"
  randomInfo = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates expedita ipsa voluptatem repellendus dolores dignissimos soluta, maxime accusamus hic quos incidunt error voluptatum doloremque dicta."

  saveEvent(formValues:any):void{
    console.log(formValues)
    this.eventService.update(formValues)
    this.closeForm()
  }


  onSubmit(): void{
    this.eventService.update(this.event)
      .then(()=>this.closeForm())    
  }

  showForm(): void{
    $('.modal').show()
  }

  closeForm(): void{
    $('.modal').hide()
  }

  goBack():void{
    this.location.back()
  }
  
  // v1 implementation of promises - didn't work
  // ngOnInit():void {
  //   this.eventService.getEvent(+this.route.snapshot.params['id']).then(event => this.event = event)
  // }
  
  // original working w/o promises
  // ngOnInit():void {
  //   this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  // }

} 