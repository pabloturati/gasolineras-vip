import { Injectable } from '@angular/core'
import { Http, Response} from '@angular/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class SaleService {
  // url = "http://localhost:3000/sale/"
  url = "/api/sale/"
  
  constructor(private http:Http) {}

  //Get all sales - NOT USED YET
  getAllOrders(){
    return this.http.get(this.url).toPromise()
    .then((res: Response)=> res.json())
    .catch(e=>console.log(e))
  }

  //Get one sale  - NOT USED YET
  getOneSale(id){
    return this.http.get(this.url + id)
    .pipe(map((res:Response)=>res.json()))
  }

  //Create a sale
  createSale(obj){
    return this.http.post(this.url, obj, {withCredentials: true})
    .pipe(map((res: Response)=>res.json()))
  }
}
