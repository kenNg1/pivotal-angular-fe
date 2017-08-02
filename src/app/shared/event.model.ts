export class IEvent {
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
    sportId: number
}
