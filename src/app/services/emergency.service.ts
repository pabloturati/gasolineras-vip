import { Injectable } from '@angular/core'
import { Http, Response} from '@angular/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  constructor(private http:Http) {}

  // url = "http://localhost:3000/report/"
  url = "/api/report/"

  //Get all reports - NOT USED YET
  getAllReports(){
    return this.http.get(this.url).toPromise()
    .then((res: Response)=> res.json())
    .catch(e=>console.log(e))
  }

  //Create a report
  createReport(obj){
    return this.http.post(this.url, obj, {withCredentials: true})
    .pipe(map((res: Response)=>res.json()))
  }
}