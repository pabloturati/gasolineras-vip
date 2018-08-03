import { Injectable } from '@angular/core';
import { of } from 'rxjs'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class UpdateNavService {

  userStatus: boolean;

  constructor() { 
    this.userStatus = false
  }

  userOperation(): Observable<boolean>{
    const user = JSON.parse(localStorage.getItem('user'))
    if(user){
      console.log("hay")
      console.log(user)
      this.userStatus = true;
    }
    return of(this.userStatus);
  }

}
