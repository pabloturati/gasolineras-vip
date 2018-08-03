import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router'
import {AuthService} from '../services/auth.service'
import {UpdateNavService} from '../services/update-nav.service'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  userLogged: boolean;

  constructor(
    private authService: AuthService,
    private updateNavService: UpdateNavService,
    private router: Router){
    this.userLogged = false
  }
  ngOnInit() {
    // this.updateNavService.userOperation().subscribe(result=>{
    //     console.log("aca es")
    //     console.log(result)
    //     this.userLogged = result;
    // })
    
    // If the user is logged
    if(localStorage.getItem('user')){
      const user = JSON.parse(localStorage.getItem('user'))
      this.userLogged = true;
      this.router.navigate(['profile']) 
    }
  }

  //AQUI>>!!!!!!!!!!!
  userLoggedIn(){
    if(localStorage.getItem('user')){
      this.userLogged = true
      console.log("updated because user loggedin")
    }
  }

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
