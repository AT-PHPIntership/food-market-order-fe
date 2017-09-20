import { Component } from '@angular/core';
import { CartService } from '../../service/cart.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any;
  title = 'app';
  constructor(private cartService: CartService, private _location: Location) {
    this.cart = this.cartService;
  }
  back() {
    this._location.back();
  }
  updateCartFood() {
    this.cartService.updateCart('App\\Food');
  }
  updateCartMaterial() {
    this.cartService.updateCart('App\\Food');
  }
}
