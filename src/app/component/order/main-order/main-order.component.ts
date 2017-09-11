import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { TokenService } from '../../../service/token.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { OrderService } from '../../../service/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-order',
  templateUrl: './main-order.component.html',
  styleUrls: ['../order.component.css']
})
export class MainOrderComponent implements OnInit {
  cart: any;
  ortherShip = false;
  orderForm: FormGroup;
  constructor(private cartService: CartService,
              public tokenService: TokenService,
              private formBuilder: FormBuilder,
              private orderService: OrderService,
              private router: Router) {
    this.cart = this.cartService;
    this.orderForm = this.formBuilder.group({
      personal: this.formBuilder.group({
        email: new FormControl('', [Validators.required, Validators.email]),
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
        address: new FormControl('', [Validators.required])
      }),
      shipAddress: this.formBuilder.group({
        address: new FormControl('', [Validators.required]),
      }),
    });
  }
  order(items) {
    if (!this.orderForm.valid) {
      swal('Thông báo!', 'Dữ liệu chưa hợp lệ! Mời bạn kiểm tra lại', 'error');
      return;
    }
    if (this.tokenService.currentUser === undefined) {
      swal('Thông báo!', 'Mời bạn đăng nhập rồi thực hiện chức năng này!', 'error');
      return;
    }
      let model, data;
      model = this.orderForm.value;
      data = {
        'address_ship': model.shipAddress.address !== '' ? model.shipAddress.address : model.personal.address,
        'trans_at': '2017-01-01',
        'note': model.note,
        'user_id': this.tokenService.currentUser.id,
        'type': 'App\\Food',
        'items': items
      };
      // console.log(data);
      this.orderService.sendOrder(data).subscribe((a: any) => {
        swal('Thông báo', 'Đặt hàng thành công!', 'success');
        this.cartService.removeCart();
        this.router.navigate(['/home']);
      }, (err: any) => {
        swal('Thông báo!', 'Đặt hàng thất bại!', 'error');
      });
  }
  ngOnInit() {
  }

}
