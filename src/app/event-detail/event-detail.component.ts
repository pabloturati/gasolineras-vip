import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SaleService} from '../services/sale.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.css']
})
export class EventDetailComponent implements OnInit {
  id: any
  order: any
  sale: any = {}
  showEdit: boolean = false

  constructor(
    private activeRoute: ActivatedRoute,
    private saleService: SaleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.activeRoute.params
    .subscribe(params=>{
      this.id = params.id
      
      this.saleService.getOneSale(this.id)
      .subscribe(sale=>{
        this.sale = sale
      })
    })

    this.activeRoute.queryParams
    .subscribe(query=>{
      return query
    })
  }
  navigateToProfile(){
    this.router.navigateByUrl('/profile')
  }

  editOrder(){
    console.log("editOrder()")
    
  }
  cancelOrder(){
    this.saleService.deleteSale(this.id)
    .subscribe(sale=>{
      if(!confirm("Are you sure you want to delete this order?")) return
      this.router.navigateByUrl('/profile')
    })
  }
}
