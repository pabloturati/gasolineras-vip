import { Component, OnInit } from '@angular/core';
import { stringify } from '@angular/core/src/util';
import {Router} from '@angular/router'
import {AuthService} from '../services/auth.service';
import {EmergencyService} from '../services/emergency.service'


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  activeEmergency: boolean
  user: any 
  orders: Array<any>
  localUser: any
  username: string
  email: string
  address: string
  photoURL: string
  activeReportId: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private emergencyService: EmergencyService
  ) { 
    this.orders = []
  }
  ngOnInit() {
    this.activeReportId = ""
    this.activeEmergency = false
    this.checkIfUser()
    this.getBackEndUser()
  }
  checkIfUser(){
    this.localUser = localStorage.getItem('user')
    if(!this.localUser) this.router.navigate(['/login'])
  }
  //Changes the report status to 'cancelled'
  cancelReport(){
    if(!confirm("Are you sure you wish to cancel the Emergency Request")) return
    this.emergencyService.cancelReport(this.activeReportId)
    .subscribe(response=>{
      this.activeReportId = ""
      this.activeEmergency = false
    })
  }
  getBackEndUser(){
    this.authService.getLoggedUser()
    .subscribe(user=>{
      this.user = user
      this.username = this.user.username
      this.email = this.user.email
      this.address =this.user.address
      this.orders = this.user.purchases
      this.photoURL = this.user.photoURL
      this.getReportsAndStatus()
    })
  }
  //Get Emergency Reports and check for emergency status
  getReportsAndStatus(){
    this.emergencyService.getAllReports()
    .then(reports=>{
      reports.forEach(report => {
        if((report.orderStatus === "open") && (report.customer == this.user._id)) 
          this.activeEmergency = true
          this.activeReportId = report._id;
      });
    })
    .catch(e=>console.log(e))
  }
  purchase(){
    this.router.navigateByUrl('/newOrder')
  }
  reportRoadAssitance(){
    this.router.navigateByUrl('/roadAssistance')
  }
  seeDetail(id){
    this.router.navigateByUrl('/detail/'+id)
  }
}
