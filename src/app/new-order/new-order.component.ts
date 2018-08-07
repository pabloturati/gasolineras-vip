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
  user: any
  showMap: boolean
  
  //Child Comm
  dynamicAddress: string;
  findMe: boolean

  constructor(
    private saleService: SaleService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.resetform()

    //Get logged user
    this.authService.getLoggedUser()
    .subscribe(response=>{
      this.user = response;
    })
  }
  //Form logic
  resetform(){
    this.newOrder = {}
    this.carOrder = this.homeOrder = this.showMap = this.otherLocation = this.installDetail = this.orderComplete = false
    this.dynamicAddress = null
    this.findMe = null
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
  //Home Choice Logic
  choice(value){
    this.newOrder.serviceChoice = value;
    if(value === "newInstall") this.installDetail = true
    if(this.newOrder.operation === "home"){
      this.location('Home')
    }    
  }
  //Location Logic
  location(value){
    if(value == "Home" && this.user.address ){
      this.newOrder.location = this.dynamicAddress = this.user.address //Set the address
      this.prepSubmit()
    }
    else{
      this.otherLocation = true  //Activate input for another location
    }
  }
  searchNewLocation(){
    this.dynamicAddress = this.newOrder.location  //Gets address from input box
    this.prepSubmit()
  }
  findMyLocation(){
    this.findMe = true;
    this.prepSubmit()
  }
  getPosition(e){
    alert("You Have been located! Latitude: "+e.lat+" Longitud "+e.lng)
    this.newOrder.location = JSON.stringify(e)
  }
  //Sumbmit new Order Logic
  prepSubmit(){
    this.showMap = true
    this.orderComplete = true; //activate submit
  }

  submitOrder(){
    this.saleService.createSale(this.newOrder)
    .subscribe(p=>{
      alert("New Order Posted")
      this.router.navigate(['profile'])
    }) 
  }
}
