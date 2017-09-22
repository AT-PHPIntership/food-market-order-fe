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
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      if (!this.id) {
        this.router.navigate(['/home']);
      }
    });
    this.order = {
      order_items: []
    };
    this.orderService.getItemByOrder(this.id).subscribe(data => {
      if (data.data.length !== 0) {
        console.log(data);
        this.order = data.data;
      }
    });
  }
  changeQuantity(val, index) {
    this.order.order_items[index].quantity = val;
  }
  removeItem(item) {
    let index;
    index = this.order.order_items.indexOf(item);
    this.order.order_items.splice(index, 1);
  }
  back() {
    this._location.back();
  }
  updateOrder(item) {

  }
  removeOrder(item) {
  }
  getTotal() {
    let total: number;
    total = 0;
    if (this.order.order_items.length !== 0) {
      this.order.order_items.forEach(function (item) {
        total += (item.itemtable.price * item.quantity);
      });
    }
    return total;
  }
}
