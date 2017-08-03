import { Injectable } from '@angular/core';
import { IEvent } from './event.model';

@Injectable()
export class EventService {

  getEvents(){
    let events = EVENTS
    return events
  }
}


const EVENTS: IEvent[] = [
  { id: 1,
    name: "Hockey Training",
    date: new Date('08/01/2017'),
    time: '19:00',
    price: 40,
    imageUrl: '../assets/img/events/hockey.png',
    location:{
        district: 'Hung Hom',
        address: 'Granville Road'
    },
    level: 'Intermediate',
    onlineUrl: 'www.hockey.com',
    userId: 1,
    sportId: 1
  },
  { id: 2,
    name: "Rugby Practice",
    date: new Date('08/10/2017'),
    time: '20:00',
    price: 50,
    imageUrl: '../assets/img/events/rugby.png',
    location:{
        district: 'Causeway Bay',
        address: 'Happy Valley'
    },
    level: 'Advanced',
    onlineUrl: 'www.rugby.com',
    userId: 2,
    sportId: 2
  },
  { id: 3,
    name: "Football Game",
    date: new Date('08/02/2017'),
    time: '11:00',
    price: 25,
    imageUrl: '../assets/img/events/football.png',
    location:{
        district: 'Quarry Bay',
        address: 'Quarry Bay Park'
    },
    level: 'Beginners',
    onlineUrl: 'www.football.com',
    userId: 3,
    sportId: 3
  }
]

