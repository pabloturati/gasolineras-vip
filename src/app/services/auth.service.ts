
import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http'
import {map} from 'rxjs/operators'
import {Observable} from 'rxjs'
import { Router } from '@angular/router'


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  url = "http://localhost:3000/"

  constructor(
    private http: Http,
    private router: Router
  ) { }

  signup(auth): Observable<string>{
    return this.http.post(this.url + 'signup', auth)
    .pipe(map(res=>res.json()))
  }

  login(auth): Observable<string>{
    return this.http.post(this.url + 'login', auth, {withCredentials:true})
    .pipe(map(res=>res.json()))
  }

  // getPrivatePhones(){
  //   return this.http.get(this.url + 'private', {withCredentials:true})
  //   .pipe(map(res=>res.json()))
  // }

  logout(){
    localStorage.removeItem('user')
    this.router.navigate(['login'])
    console.log("user removed")
  }

}
