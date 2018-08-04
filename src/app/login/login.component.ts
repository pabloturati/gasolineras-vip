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
  auth = {}
  user = null

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
    .subscribe(user=>{
      this.user = user
    })
  }

  login(){
    this.authService.login(this.auth)
    .subscribe(user=>{
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
      this.router.navigate(['profile'])
      window.location.reload();
      //this.updateNavService.userOperation(); 
    })
  }

  loginWithFacebook(){
    this.firebaseService.loginWithFacebook()
      .then(response=>{
        this.router.navigate(['profile'])
        window.location.reload();
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
