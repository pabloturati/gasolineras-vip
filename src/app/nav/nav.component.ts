import { Component, OnInit, OnChanges, SimpleChange } from '@angular/core';
import {Router} from '@angular/router'
import {AuthService} from '../services/auth.service'
import {UpdateNavService} from '../services/update-nav.service'
import { Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnChanges {
  
  @Input() changeActivation: boolean

  userLogged: boolean;

  constructor(
    private authService: AuthService,
    //private updateNavService: UpdateNavService,
    private router: Router){
    this.userLogged = false
  }

  ngOnChanges(changes){
    if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user'))
      this.userLogged = true;
    }
  }

  // //AQUI>>!!!!!!!!!!!
  // userLoggedIn(){
  //   if(localStorage.getItem('user')){
  //     this.userLogged = true
  //     console.log("updated because user loggedin")
  //   }
  // }

  homeClick(){
    this.collapse();
    this.router.navigateByUrl('/home')
  }

  collapse(){
    let div = document.getElementById("navbarToggleExternalContent")
    
    div.classList.remove("show")
  }

  logout(){
    this.authService.logout()
    this.userLogged = false;
  }
}
