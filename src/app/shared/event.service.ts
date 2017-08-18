import { Injectable } from '@angular/core'; 
import { Event } from './event.model';

@Injectable()
export class EventService {

  getEvents(): Event[] {
    return EVENTS
  }

  getEvent(id:number){
    return EVENTS.find(event => event.id === id)
  }
}

const EVENTS: Event[] = [
  { id: 1,
    name: "Hockey Training",
    date: new Date('08/01/2017'),
    time: '19:00',
    price: 40,
    imageUrl: '../assets/img/events/hockey.png',
    location:{
        district: 'Hung Hom',
        address: '2-8, Granville Road'
    },
    level: 'Intermediate',
    onlineUrl: 'www.hockey.com',
    userId: 1,
    sportId: 1,
    terrain: 'Outdoor',
    intensity: 'Friendly',
    sportsImageUrl: ['../assets/img/sportsUrls/hockey1.jpg'],
    userImageUrl: '../assets/img/faces/mp.jpg',
    userName: 'Michelle Pfiefer'
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
    sportId: 2,
    terrain: 'Outdoor',
    intensity: 'Competition',
    sportsImageUrl: ['../assets/img/sportsUrls/rugby1.jpg'],
    userImageUrl: '',
    userName: 'Michelle Pfiefer'
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
    level: 'Intermediate',
    onlineUrl: 'www.football.com',
    userId: 3,
    sportId: 3,
    terrain: 'Indoor',
    intensity: 'Friendly',
    userImageUrl: '',
    userName: 'Michelle Pfiefer'
  },
  { id: 4,
    name: "Ultimate Frisbee in the Park",
    date: new Date('08/02/2017'),
    time: '11:00',
    price: 25,
    imageUrl: '../assets/img/events/f1.png',
    location:{
        district: 'Quarry Bay',
        address: 'Quarry Bay Park'
    },
    level: 'Beginner',
    onlineUrl: 'www.football.com',
    userId: 3,
    sportId: 3,
    terrain: 'Outdoor',
    intensity: 'Practice',
    userImageUrl: '',
    userName: 'Michelle Pfiefer'
  },
  { id: 5,
    name: "Hockey game for beginners",
    date: new Date('08/02/2017'),
    time: '11:00',
    price: 25,
    imageUrl: '../assets/img/events/hockey.png',
    location:{
        district: 'Quarry Bay',
        address: 'Quarry Bay Park'
    },
    level: 'Beginner',
    onlineUrl: 'www.football.com',
    userId: 3,
    sportId: 3,
    terrain: 'Outdoor',
    intensity: 'Friendly',
    userImageUrl: '',
    userName: 'Michelle Pfiefer'
  },
  { id: 6,
    name: "Ultimate Frisbee HK Tournament IV",
    date: new Date('08/02/2017'),
    time: '11:00',
    price: 35,
    imageUrl: '../assets/img/events/f2.png',
    location:{
        district: 'Quarry Bay',
        address: 'Quarry Bay Park'
    },
    level: 'Beginner',
    onlineUrl: 'www.football.com',
    userId: 3,
    sportId: 3,
    terrain: 'Outdoor',
    intensity: 'Competitive',
    userImageUrl: '',
    userName: 'Michelle Pfiefer'
  }
]

