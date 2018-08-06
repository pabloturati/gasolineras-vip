import { Component, OnInit } from '@angular/core'
import { SaleService } from '../services/sale.service'
import {AuthService} from '../services/auth.service'
import {Router} from '@angular/router'

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.css']
})
export class NewOrderComponent implements OnInit {

  newOrder: any
  carOrder: boolean
  homeOrder: boolean
  otherLocation: boolean
  installDetail: boolean
  orderComplete: boolean
  userId: any;
  showMap: boolean

  constructor(
    private saleService: SaleService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetform()

    //Get logged user
    // this.authService.getLoggedUser()
    //   .subscribe(response=>{
    //     this.userId = response._id;
    //     //console.log(this.userId)
    //   })
  }
  resetform(){
    this.newOrder = {}
    this.carOrder = false
    this.homeOrder = false
    this.showMap = false
    this.otherLocation = false
    this.installDetail = false
    this.orderComplete = false
    
  }
  toggleCarHome(value){
    this.resetform()
    if(value === "car"){
      this.carOrder = true;
      this.homeOrder = false;
      this.newOrder.operation = "car";
    } else if (value === "home"){
      this.carOrder = false;
      this.homeOrder = true;
      this.newOrder.operation = "home";
    }
  }
  choice(value){
    this.newOrder.serviceChoice = value;
    if(this.newOrder.operation == "home"){
      this.orderComplete = true //activate sumit
      this.location('home')
    }
    if(value === "newInstall") this.installDetail = true
    
  }
  location(value){
    if(value === "Home"){
      this.newOrder.location = "Home"  //Change for user's address
    }
    else{
      this.otherLocation = true
    }
    this.showMap = true
    this.orderComplete = true; //activate submit
  }
  submitOrder(){
    //this.newOrder.customer = this.userId;
    this.saleService.createSale(this.newOrder)
    .subscribe(p=>{
      alert("New Order Posted")
      this.router.navigate(['profile'])
    }) 
  }
}
