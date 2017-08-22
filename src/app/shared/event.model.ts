export class Event {
    id: number
    name: string
    date: Date
    time: string
    price: number
    imageUrl?: string
    location:{
        district: string
        address: string
    }
    level: string
    onlineUrl?: string
    userId: number
    userName?: string    
    userImageUrl?: string    
    sportId: number
    terrain?: string
    intensity?: string
    sportsImageUrl?: string[]
}
