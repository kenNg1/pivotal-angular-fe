export class Event {
    id: number;
    name?: string;
    description?: string;
    sport_id?: number;
    district_id?: number;
    user_id?: number;
    level?: string;
    intensity?: string;
    terrain?: string;
    price?: number;
    imageUpload?: string;
    date?: Date;
    time?: string;        
    address?: string;
    // virtual attribute
    userImgSrc?:string;
    District?:any;
    User?:any;
    Sport?:any;
    usersJoined?:any;
}
