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
  // allowButtonClick: boolean = false;

  dists = [
    {value: '0', viewValue: 'Central'},
    {value: '1', viewValue: 'Causeway Bay'},
    {value: '2', viewValue: 'Kowloon Tong'}
  ];

  constructor(private eventService:EventService, private route:ActivatedRoute, private location: Location ) {
    // setTimeout(() => this.allowButtonClick = true, 2000);    
  }
  
  // full blown Angular docs
  ngOnInit():void {
   this.route.paramMap
    .switchMap((params: ParamMap) => this.eventService.getEvent(+params.get('id')))
    .subscribe(res => {
      this.event = res;
      console.log(this.event.date);
      window.scrollTo(0, 0)
    })
  }

  randomAvailability = "9/10"
  randomInfo = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptates expedita ipsa voluptatem repellendus dolores dignissimos soluta, maxime accusamus hic quos incidunt error voluptatum doloremque dicta."

  saveEvent(formValues:any):void{
    
    console.log(formValues)
    this.closeForm()    
    this.eventService.update(formValues).then(()=> this.goBack())
  }

  showForm(): void{
    window.scrollTo(0, 0);        
    $('.modal').show()
  }

  closeForm(): void{
    window.scrollTo(0, 0);        
    $('.modal').hide();
  }

  goBack():void{
    this.location.back()
  }

  delete(event:Event):void{
    this.eventService
      .delete(event.id)
      .then(()=> {
        this.goBack()
      })
  }
  
  // v1 implementation of promises - didn't work
  // ngOnInit():void {
  //   this.eventService.getEvent(+this.route.snapshot.params['id']).then(event => this.event = event)
  // }

  // http://cms.acceleratedhk.com/angular/08-routing/01-routing.html tells you about downsides of snapshot. snapshot seems to be simpler BUT the main issue is if you are navigating from e.g. DepartmentDetailComponent back to DepartmentListComponent, the value is not going to be updated for this.route.snapshot.params['id']. Therefore, please use the observable way which is safer way to guarantee that the values of the param are already up-to-date.
  
  // original working w/o promises
  // ngOnInit():void {
  //   this.event = this.eventService.getEvent(+this.route.snapshot.params['id'])
  // }

} 