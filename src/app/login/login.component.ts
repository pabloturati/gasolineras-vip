import { Component, OnInit } from '@angular/core'
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'
import {FirebaseService} from '../services/firebase.service'
import {UpdateNavService} from '../services/update-nav.service'
//import { Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged = true
  auth = {}
  user:any = null

  constructor(
    private firebaseService: FirebaseService,
    private authService: AuthService,
    private updateNavService: UpdateNavService,
    private router: Router
  ) { }

  change(){
    this.isLogged = !this.isLogged;
  }

  signup(){
    this.authService.signup(this.auth)
    .subscribe(
      response=>{
        this.user = response
        alert("User Crated. Welcole "+this.user.username+". Please login to your new account")
        console.log(this.user.username)
      },
      error => {
        alert("Could not create user. Please try again" + error)
        window.location.reload();
        console.log(error)
      },
      () => {
        this.login();
      }
    )
  }

  login(){
    this.authService.login(this.auth).toPromise()
    .then(user=>{
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      this.router.navigate(['profile']) 
      window.location.reload();
    })
    .catch(e=>{
      alert(e.statusText+ " Please verify your credentials or create an account")
    })
  }

  loginWithFacebook(){
    this.firebaseService.loginWithFacebook()
      .then(response=>{
        console.log(`que pedo`, response)
        localStorage.setItem('user',JSON.stringify(response.user))
        //window.location.reload();
        this.authService.getLoggedUser()
        .subscribe(r=>{
          this.router.navigate(['profile'])
          console.log("regreso: ", r)
        })
      })
    
  }
  loginWithGoogle(){
    this.firebaseService.loginWithGoogle()
  }
  redirectToProfile(){
    if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user'))
      this.router.navigate(['profile'])
    }
  }
  ngOnInit() {
    this.redirectToProfile()
  }
}
