import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { OrderService } from '../../../service/order.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-order-detail',
  templateUrl: './orderDetail.component.html',
  providers: []
})
export class OrderDetailComponent {
  id: number;
  order: any;
  constructor(private _location: Location,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router) {
    this.order.orderItems = [];
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.router.navigate(['/home']);
      }
    });
    this.orderService.getItemByOrder(this.id).subscribe(data => {
      this.order = data.data;
    });
  }
  changeQuantity(val, index) {
    this.order.orderItems[index].quantity = val;
  }
  removeItem(item) {
    let index;
    index = this.order.orderItems.indexOf(item);
    this.order.orderItems.splice(index, 1);
  }
  back() {
    this._location.back();
  }
  updateOrder(item) {

  }
  getTotal() {
    let total: number;
    total = 0;
    this.order.orderItems.forEach(function (item) {
      total += (item.itemtable.price * item.quantity);
    });
    return total;
  }
}
