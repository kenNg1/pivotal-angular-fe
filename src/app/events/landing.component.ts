import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Event } from '../shared/event.model';
import { Sport } from '../shared/sport.model';
import { District } from '../shared/district.model';
import { EventService } from '../shared/event.service';
import { SportService } from '../shared/sport.service';
import { DistrictService } from '../shared/district.service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgxCarouselModule } from 'ngx-carousel';
import 'hammerjs';
import { MatDatepicker } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {
  events:Event[]=[];
  sports:Sport[]=[];
  randoms:Sport[]=[];
  districts:any[] = [];
  // randomBegin = 0;
  d = new Date();
  randomBegin = this.d.getTime()%10;
  @ViewChild('keepOpen') input: ElementRef;

  level = [
    { level: 'beginner' },
    { level: 'intermediate' },
    { level: 'advanced' }
    ];

  days = [
    { day: 'M', num: 1 },
    { day: 'T', num: 2 },
    { day: 'W', num: 3 },
    { day: 'Th', num: 4 },
    { day: 'F', num: 5 },
    { day: 'S', num: 6 },
    { day: 'Su', num: 0 },
    ];

  terrain = [
    { terrain: 'indoor' },
    { terrain: 'outdoor' },
    ];
  
  intensity = [
      { intensity: 'friendly' },
      { intensity: 'casual' },
      { intensity: 'competitive' },
      ];

  dateSelected;
  dateSelectedBis = true;
  dayfiltered:number[]=[0, 1, 2, 3, 4, 5, 6];
  levelchecked:string[] = ['beginner','intermediate', 'advanced'];
  terrainfiltered:string[] = ['indoor','outdoor'];
  intensityfiltered:string[] = ['casual','friendly','competitive'];

  districtfiltered:number[]=[];



  
  selectionForm: FormGroup;

  constructor(private eventService:EventService,
    private sportService:SportService,
    private districtService:DistrictService,
    private fb: FormBuilder) { }

  ngOnInit():void {
    this.getEvents();
    this.getSports();
    this.districtService.getDistricts().then(districts => {
      this.districts = districts;
      for (let i=0 ; i<this.districts.length ; i++) {
        this.districtfiltered.push(this.districts[i].id);
      }
    });
    this.createForm();
  }

  _openCalendar(picker: MatDatepicker<Date>) {
    picker.open();
  }

  resetdatesearch() {
    this.dateSelectedBis = false;
  }

  createForm(): void {
    this.selectionForm = this.fb.group({
      level: 'true',
      date: '',
      day: 'true',
      district: 'true',
      terrain: 'true',
      intensity: 'true',
    });
    this.selectionForm.valueChanges
    .subscribe(data => {
      if (data.date !== '') {
      this.dateSelected = data.date;
      this.dateSelectedBis = false;
      }
    });
  }
  dateselected(date:any): boolean {
    date = new Date(date);
    this.dateSelected = new Date(this.dateSelected);
        
    if (((date.getFullYear() === this.dateSelected.getFullYear()) && (date.getMonth() === this.dateSelected.getMonth()) && 
    (date.getDate() === this.dateSelected.getDate())) || (this.dateSelectedBis)) {
      return true;
    } else {
      return false;
    }
  }

  districtselected(districtId:any): boolean {
    if (this.districtfiltered.includes(districtId)) {
      return true;
    } else {return false;}
  }

  terrainselected(terrain:any): boolean {
    if (this.terrainfiltered.includes(terrain)) {
      return true;
    } else {return false;}
  }

  intensityselected(intensity:any): boolean {
    if (this.intensityfiltered.includes(intensity)) {
      return true;
    } else {return false;}
  }

  dayselected(date:any): boolean {
    date = new Date(date);

    if (this.dayfiltered.includes(date.getDay())) {
      return true;
    } else {return false;}
  }

  levelselected(level:any): boolean {
    for (let i=0 ; i<this.levelchecked.length ; i++) {
      if (level.includes(this.levelchecked[i])) {
        return true;
      }
    }
    return false;
  }

  toggleDistrict (checked) {
    const position = this.districtfiltered.indexOf(checked);
    if (position !== -1) {
        this.districtfiltered.splice(position,1);
    } else {
      this.districtfiltered.push(checked);
    }
  }

  toggleDay (checked) {
    const position = this.dayfiltered.indexOf(checked);
    if (position !== -1) {
        this.dayfiltered.splice(position,1);
    } else {
      this.dayfiltered.push(checked);
    }
  }

  toggleIntensity(checked) {
    const position = this.intensityfiltered.indexOf(checked);
    if (position !== -1) {
        this.intensityfiltered.splice(position,1);
    } else {
      this.intensityfiltered.push(checked);
    }
  }

  toggleTerrain(checked) {
    const position = this.terrainfiltered.indexOf(checked);
    if (position !== -1) {
        this.terrainfiltered.splice(position,1);
    } else {
      this.terrainfiltered.push(checked);
    }
  }

  toggleLevel(checked) {
    const position = this.levelchecked.indexOf(checked);
    if (position !== -1) {
        this.levelchecked.splice(position,1);
    } else {
      this.levelchecked.push(checked);
    }
  }


  isSelected(event:Event): boolean {
    if((this.levelselected(event.level)) && (this.dateselected(event.date))
    && (this.dayselected(event.date)) && (this.districtselected(event.district_id))
    && (this.terrainselected(event.terrain)) && (this.intensityselected(event.intensity))) {
      return true;
    }
    return false;
}

// isSelected(event:Event): boolean {
//   if((this.levelselected(event.level)) && (this.dateselected(event.date))) {
//     return true;
//   }
//   return false;
// }


  

  getEvents(): void {
    this.eventService.getEvents().then(events => {

      this.events = events.sort(sortByDateAsc);
      if(Array.isArray(this.events[0].level)) {
        return null;
      } else {
        for (let i=0;i<this.events.length;i++) {
          this.events[i].level = JSON.parse(JSON.stringify(this.events[i].level)
          .replace(/"{/g,'["').replace(/}"/g,'"]').replace(/,/g,'","'));
        }
      }

     });
  }

  getSports(): void {
    this.sportService.getSports()
      .then(sports => {
        this.sports = sports;
        const repeat = 5-sports.length%5;
        for(let i=0;i<repeat;i++) {
          this.sports.push(this.sports[i]);
        }
        this.setRandoms();
      });
  }

  setRandoms():void {
    const arr = [];
    let beg = this.randomBegin;
    for (let i=0;i<5;i++) {
      if (beg>=0 && beg<this.sports.length) {
        arr.push(this.sports[beg]);
        beg+=1;
      } else if (beg>=this.sports.length-1) {
        beg = beg-this.sports.length;
        arr.push(this.sports[beg]);
        beg+=1;
      } else if (beg<0) {
        beg = this.sports.length+beg;
        arr.push(this.sports[beg]);
        beg+=1;
      }
    }
    if (this.randomBegin < 0) {
      this.randomBegin = this.sports.length+this.randomBegin;
    } else if (this.randomBegin >this.sports.length-1) {
      this.randomBegin = this.randomBegin - this.sports.length;
    }
    this.randoms = arr;
  }

  // BELOW IS prior to using promises
  // getEvents(): void {
  //   this.events = this.eventService.getEvents()
  // }

  sendSport(id:number,name:string) {
    this.sportService.searchedSportId = id;
    this.sportService.searchedSportName = name;
  }


  randomLeft() {
    this.randomBegin -= 5;
    if(this.randomBegin<this.sports.length*-1) {
      this.randomBegin=0;
    }
    this.setRandoms();
  }

  randomRight() {
    this.randomBegin += 5;
    if(this.randomBegin===this.sports.length) {
      this.randomBegin=0;
    }
    this.setRandoms();
  }


  // ABOVE IMPLEMENTATION IS OFFICIAL DOCS
  // ngOnInit() {
  //   this.events = this.eventService.getEvents().map(events => events)
  //   return this.events
  // }

}

function sortByDateAsc(e1:Event, e2:Event) {
  if(e1.date > e2.date) {
    return 1;
  } else if(e1.date === e2.date) {
    return 0;
  } else {return -1;}
}
