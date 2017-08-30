import { Component } from '@angular/core';
import {CartService} from '../../service/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  cart: any;
  constructor(private cartService: CartService) {
    this.cart = this.cartService;
  }
  title = 'app';
}
