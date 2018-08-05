import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/core/src/util';
import {Router} from '@angular/router'
import {AuthService} from '../services/auth.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: any 
  username: string
  photoURL: string
  email: string
  orders: Array<any>

  constructor(
    private router: Router,
    private authService: AuthService
  ) { 
    this.orders = []
  }

  ngOnInit() {
    this.authService.getLoggedUser()
    .subscribe(user=>{
      console.log(user)
      this.user = user
      this.username = this.user.username
      this.email = this.user.email
      this.photoURL = this.user.photoURL
      this.orders = this.user.purchases
    })
     
    //////////////////////////Esto
    //Quitar para arregalar ruta de inicio
    this.router.navigateByUrl('/newOrder')
    //////////////////////////Esto
  }

  purchase(){
    this.router.navigateByUrl('/newOrder')
  }

  reportRoadAssitance(){
    this.router.navigateByUrl('/roadAssistance')
  }

  reportLeak(){
    this.router.navigateByUrl('/gasEmergency')
  }

}
