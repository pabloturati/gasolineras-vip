import { Injectable } from '@angular/core'
import { Http, Response} from '@angular/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class EmergencyService {

  constructor(private http:Http) {}

  // url = "http://localhost:3000/api/report/"
  url = "/api/report/"

  //Get all reports (returns only this user's reports)
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

  //Cancel Report (does NOT delete it)
  cancelReport(id){
    return this.http.patch(this.url + id, id)
    .pipe(map((res: Response)=>res.json()))
  }
}