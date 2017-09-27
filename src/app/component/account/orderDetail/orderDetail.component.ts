import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { OrderService } from '../../../service/order.service';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-order-detail',
  templateUrl: './orderDetail.component.html',
  providers: []
})
export class OrderDetailComponent {
  id: number;
  order: any;
  transAt: any;
  notify: any;
  constructor(private _location: Location,
              private orderService: OrderService,
              private route: ActivatedRoute,
              private router: Router,
              private translate: TranslateService) {
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
        this.order = data.data;
        this.transAt =  this.order.trans_at.replace(' ', 'T');
      }
    });
  }
  changeQuantity(val, index) {
    this.order.order_items[index].quantity = val;
  }
  removeItem(item) {
    this.translate.get('confirm_delete').subscribe((res: any) => {
      this.notify = res;
    });
    swal({
      title: `${this.notify.title}?`,
      text: `${this.notify.message}!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.notify.text_confirm}!`,
      cancelButtonText: `${this.notify.text_cancel}!`,
    }).then(() => {
      this.orderService.deleteOrderItem(item.id).subscribe(res => {
        let index;
        index = this.order.order_items.indexOf(item);
        this.order.order_items.splice(index, 1);
        this.translate.get('delete_success').subscribe((info: any) => {
          this.notify = info;
        });
        swal(
          `${this.notify.title}!`,
          `${this.notify.message}.`,
          'success'
        );
      }, err => {
        this.notify = this.translate.instant('error_delete');
        swal(
          `${this.notify.title}!`,
          `${this.notify.message}.`,
          'error'
        );
      });
    }).catch(swal.noop);
  }
  back() {
    this._location.back();
  }
  updateOrder() {
    this.translate.get('confirm_update').subscribe((res: any) => {
      this.notify = res;
    });
    swal({
      title: `${this.notify.title}?`,
      text: `${this.notify.message}!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.notify.text_confirm}!`,
      cancelButtonText: `${this.notify.text_cancel}!`,
    }).then(() => {
      let data;
      let items;
      items = [];
      this.order.order_items.forEach(item => {
        items.push({id: item.id, quantity: item.quantityOrder});
      });
      data = {
        'address_ship': this.order.address,
        'trans_at': this.transAt,
        'items': items
      };
      this.orderService.updateOrder(this.id, data).subscribe(res => {
        this.translate.get('update_success').subscribe((info: any) => {
          this.notify = info;
        });
        swal(
          `${this.notify.title}!`,
          `${this.notify.message}.`,
          'success'
        );
      }, err => {
        this.notify = this.translate.instant('error_update');
        swal(
          `${this.notify.title}!`,
          `${this.notify.message}.`,
          'error'
        );
      });
    }).catch(swal.noop);
  }
  removeOrder() {
    this.translate.get('confirm_delete').subscribe((res: any) => {
      this.notify = res;
    });
    swal({
      title: `${this.notify.title}?`,
      text: `${this.notify.message}!`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${this.notify.text_confirm}!`,
      cancelButtonText: `${this.notify.text_cancel}!`,
    }).then(() => {
      this.orderService.deleteOrder(this.id).subscribe(res => {
        this.translate.get('delete_success').subscribe((info: any) => {
          this.notify = info;
        });
        swal(
          `${this.notify.title}!`,
          `${this.notify.message}.`,
          'success'
        );
      }, err => {
        this.notify = this.translate.instant('error_delete');
        swal(
          `${this.notify.title}!`,
          `${this.notify.message}.`,
          'error'
        );
      });
    }).catch(swal.noop);
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
