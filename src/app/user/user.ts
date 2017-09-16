export class User {
    username?: string;
    // is this going to cause security issues?
    password?: string;
  
    constructor()
    {
      this.username = '';
      this.password = '';
    }
  
}

// previous implementation of it
// export interface User {
//     id?:number,
//     name?: string,
//     email?: string,        
//     nickName?: string,
//     image?: string,      
//     tier?: string,
//     description?: string,  
// }
