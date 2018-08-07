import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  mainImg1: String = "../../assets/index/indexMainPic.jpg"
  mainImg2: String = "../../assets/learn-more/emission.jpg"
  mainImg3: String = "../../assets/learn-more/heater.jpg"

  constructor(private router: Router) { }

  ngOnInit() {
  }

  loginBtnClick() {
    this.router.navigateByUrl('/login')
  } 
  learnBtnClick() {
    this.router.navigateByUrl('/learn')
  } 


}
