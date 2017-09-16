export class User {
    username?: string;
    // is this going to cause security issues?
    password?: string;
    email?: string;
  
    constructor()
    {
      this.username = '';
      this.password = '';
      this.email = '';
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
