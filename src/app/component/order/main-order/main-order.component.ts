import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { TokenService } from '../../../service/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { OrderService } from '../../../service/order.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-main-order',
  templateUrl: './main-order.component.html',
  styleUrls: ['../order.component.css']
})
export class MainOrderComponent implements OnInit {
  cart: any;
  ortherShip = false;
  orderForm: FormGroup;
  notify: any;
  constructor(private cartService: CartService,
              public tokenService: TokenService,
              private formBuilder: FormBuilder,
              private orderService: OrderService,
              private router: Router,
              private translate: TranslateService) {
    this.cart = this.cartService;
    this.orderForm = this.formBuilder.group({
      personal: this.formBuilder.group({
        email: new FormControl(tokenService.currentUser !== null ? tokenService.currentUser.email : '',
            [Validators.required, Validators.email]),
        name: new FormControl(tokenService.currentUser !== null ? tokenService.currentUser.full_name : '',
            [Validators.required]),
        phone: new FormControl(tokenService.currentUser !== null ? tokenService.currentUser.phone_number : '',
            [Validators.required, Validators.pattern('[0-9]*')]),
        address: new FormControl(tokenService.currentUser !== null ? tokenService.currentUser.address : '', [Validators.required]),
        trans_at: new FormControl('', [Validators.required])
      }),
      shipAddress: this.formBuilder.group({
        address: new FormControl(''),
      }),
    });
    this.notify = {
      title: '', message: ''
    };
    console.log(tokenService.currentUser);
  }
  order(items) {
    let model, data;
    model = this.orderForm.value;
    if (!this.orderForm.valid) {
      this.translate.get('data_invalid').subscribe((res: string) => {
        this.notify = res;
      });
      swal(this.notify.title, this.notify.message, 'error');
      return;
    }
    if (this.tokenService.currentUser === undefined) {
      this.translate.get('invite_login').subscribe((res: string) => {
        this.notify = res;
      });
      swal(this.notify.title, this.notify.message, 'error');
    }
    data = {
      'address_ship': model.shipAddress.address !== '' ? model.shipAddress.address : model.personal.address,
      'trans_at': new Date().toISOString().slice(0, 10) + ' ' + model.personal.trans_at,
      'user_id': this.tokenService.currentUser.id,
      'type': 'App\\Food',
      'items': items
    };
    this.translate.get('announce').subscribe((res: string) => {
      this.notify.title = res;
    });
    this.orderService.sendOrder(data).subscribe((a: any) => {
      this.translate.get('order_success', {
        orderId: a.data.order_id, totalPrice:  a.data.total_price
      }).subscribe((res: string) => {
        this.notify.message = res;
      });
      swal(this.notify.title, this.notify.message, 'success');
      this.cartService.removeCart();
      this.router.navigate(['/home']);
    }, (err: any) => {
      this.translate.get('order_fail').subscribe((res: string) => {
        this.notify.title = res;
      });
      swal(this.notify.title, this.notify.message, 'error');
    });
  }
  ngOnInit() {
  }

}
