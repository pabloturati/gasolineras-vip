
import { Injectable } from '@angular/core'
import {Http, Response} from '@angular/http'
import {map, catchError} from 'rxjs/operators'
import {Observable} from 'rxjs'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  // url = "http://localhost:3000/api/"
  url = "/api/"

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

  getLoggedUser(): Observable<string>{
    return this.http.get(this.url + 'loggedUser', {withCredentials:true})
    .pipe(map(res=>{
      return res.json()
    }))
  }

  logout(){
    localStorage.removeItem('user')
    console.log("user removed")

    return this.http.get(this.url + 'logout').toPromise()
    .then((res: Response)=> {
      console.log(res)
      
      this.router.navigate(['login'])
    })
    .catch(e=>console.log(e))
  }

}
