import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { AuthService } from '../services/auth.service'
import { EmergencyService } from '../services/emergency.service'

@Component({
  selector: 'app-road-assistance',
  templateUrl: './road-assistance.component.html',
  styleUrls: ['./road-assistance.component.css']
})
export class RoadAssistanceComponent implements OnInit {
  
  //Form logic
  showPreSend: boolean
  showConfirm: boolean
  locationQuery: boolean
  otherLocation: boolean
  showMap: boolean

  //Report Logic
  newReport: any
  user: any

  //Child Comm
  dynamicAddress: string;
  findMe: boolean
  
  constructor(
    private router: Router,
    private authService: AuthService,
    private emergencyService: EmergencyService
  ) { }

  ngOnInit() {
    this.resetForm()
    this.getUser()
  }

  getUser(){
    this.authService.getLoggedUser()
    .subscribe(response=>{
      this.user = response;
    })
  }

  resetForm(){
    this.showConfirm = this.showPreSend = this.locationQuery = this.showPreSend = this.showMap = false;
    this.dynamicAddress = ""
    this.newReport = {}
    this.dynamicAddress = null
    this.findMe = null
  }

  toggleCarHome(value){
    this.newReport.operation = value;
    this.locationQuery = true;  //Activate next question
  }
  location(value){
    if(value == "Home" && this.user.address){
      this.newReport.location = this.dynamicAddress = this.user.address //Set the address
      this.prepSubmit()
    }
    else{
      this.otherLocation = true  //Activate input for another location
    }
  }

  //Other Location Service
  searchNewLocation(){
    this.dynamicAddress = this.newReport.location  //Gets address from input box
    this.prepSubmit()
  }

  findMyLocation(){
    this.findMe = true;
    this.prepSubmit()
  }

  getPosition(e){
    // alert("You Have been located! Latitude: "+e.lat+" Longitud "+e.lng)
    this.newReport.location = JSON.stringify(e)
  }

  prepSubmit(){
    this.showMap = true
    this.showPreSend = true;  //Activate presend button
  }

  sumbmitToVerify(){
    this.showConfirm = true;
  }

  cancelReport(){
    this.router.navigateByUrl('/profile')
  }

  finalVerify(){
    this.emergencyService.createReport(this.newReport)
    .subscribe(p=>{
      // alert("Emergency REPORTED wait for service arrival")
      this.showConfirm  = false;
      this.router.navigate(['profile'])
    }) 
  }

}
