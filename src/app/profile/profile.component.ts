import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/core/src/util';
import {Router} from '@angular/router'


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

  constructor(
    private router: Router
  ) { 
  }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.username = this.user.username
    this.email = this.user.email
    this.photoURL = this.user.photoURL
    //console.log(this.user, this.username, this.email, this.photoURL)
     
    //////////////////////////Esto
    //Quitar para arregalar ruta de inicio
    //this.router.navigateByUrl('/newOrder')
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
