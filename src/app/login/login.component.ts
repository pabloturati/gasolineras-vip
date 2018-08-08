import { Component, OnInit } from '@angular/core'
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'
import {FirebaseService} from '../services/firebase.service'
import {UpdateNavService} from '../services/update-nav.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = true
  auth: {
    email: string,
    password: string,
    username: string,
    address: string
  } = {
    email: "",
    password: "",
    username: "",
    address: ""
  }
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

  signup(f){
    this.authService.signup(this.auth)
    .subscribe(
      response=>{
        this.user = response
        alert("User Created. Welcole "+this.user.username+". Please login to your new account")
        console.log(this.user.username)
      },
      error => {
        alert("Could not create user. Please try again" + error)
        window.location.reload();
        console.log(error)
      },
      () => {
        this.login(f);
      })
  }

  login(f){
    this.authService.login(this.auth).toPromise()
    .then(user=>{
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      this.router.navigate(['profile']) 
    })
    .catch(e=>{
      alert(e.statusText+ " Please verify your credentials or create an account")
    })
  }

  // loginWithFacebook(){
  //   this.firebaseService.loginWithFacebook()
  //     .then(response=>{
  //       this.authService.getLoggedUser()
  //       .subscribe(r=>{
  //         this.router.navigate(['profile'])
  //       })
  //     })
  // }
  // loginWithGoogle(){
  //   this.firebaseService.loginWithGoogle()
  //     .then(response=>{
  //       localStorage.setItem('user',JSON.stringify(response.user))
  //       this.authService.getLoggedUser()
  //       .subscribe(r=>{
  //         this.router.navigate(['profile'])
  //       })
  //   })
  // }
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
