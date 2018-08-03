import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-learn-more',
  templateUrl: './learn-more.component.html',
  styleUrls: ['./learn-more.component.css']
})
export class LearnMoreComponent implements OnInit {
  showHome: boolean;
  showCar: boolean;

  constructor() { }

  ngOnInit() {
    this.showHome = false;
    this.showCar = false;
  }
  toggleCar(){
    this.showCar = !this.showCar
    if(this.showCar) this.showHome = false
  }
  toggleHome(){
    this.showHome = !this.showHome;
    if(this.showHome) this.showCar = false
  }

}
