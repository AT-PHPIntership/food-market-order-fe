import { Component, OnInit } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import { TokenService } from '../../../service/token.service';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
        name: new FormControl('', [Validators.required]),
        phone: new FormControl('', [Validators.required, Validators.pattern('[0-9]*')]),
        address: new FormControl('', [Validators.required]),
      }),
      note: new FormControl('')
    });
  }
  order(items) {
    if (!this.orderForm.valid) {
      swal('Thông báo!', 'Dữ liệu chưa hợp lệ! Mời bạn kiểm tra lại', 'error');
      return;
    }
    // console.log(items);
    // console.log(this.currentUser);
    if (this.tokenService.currentUser === undefined) {
      swal('Thông báo!', 'Mời bạn đăng nhập rồi thực hiện chức năng này!', 'error');
      return;
    }
    // if (!this.orderForm.valid) {
    //   swal('Thông báo!', 'Dữ liệu không hợp lệ!', 'error');
    // } else {

      let model, data;
      model = this.orderForm.value;
      data = {
        'address': model.shipAddress.address !== '' ? model.shipAddress.address : model.personal.address,
        'name': model.shipAddress.name !== '' ? model.shipAddress.name : model.personal.name,
        'phone': model.shipAddress.phone !== '' ? model.shipAddress.phone : model.personal.phone,
        'note': model.note,
        'userId': this.tokenService.currentUser.id,
        'promotionId': 1,
        'shipId': 1,
        'orderItems': items
      };
    console.log(data);
      this.orderService.sendOrder(data).subscribe((a: any) => {
        // console.log(a);
        swal('Thông báo', 'Đặt hàng thành công!', 'success');
        this.cartService.removeCart();
        this.router.navigate(['/home']);
      }, (err: any) => {
        // console.log(err);
        swal('Thông báo!', 'Đặt hàng thất bại!', 'error');
      });
    // }
  }
  paymentOnline() {
    let data;
    data = {
      order_id: 1,
      business: 'ngocvudut1995@gmail.com',
      total_amount: this.cartService.getTotal() + 20000,
      shipping_fee: 20000,
      tax_fee: '',
      order_description: 'Thanh toán đơn hàng tại trang web foodmarket.ddns.net',
      url_success: 'http://foodmarket.ddns.net',
      url_cancel: 'http://foodmarket.ddns.net',
      url_detail: 'http://foodmarket.ddns.net'
    };
    this.cartService.paymentOnline(data).subscribe(url => {
      // console.log(url);
      window.location.href = url['_body'];
    });
  }
  ngOnInit() {
  }

}
