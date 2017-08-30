import {Component, Input, OnInit} from '@angular/core';
import {CartService} from '../../../service/cart.service';

@Component({
  selector: 'app-product-cart',
  templateUrl: './product-cart.component.html',
  styleUrls: ['./product-cart.component.css']
})
export class ProductCartComponent implements OnInit {
  @Input() product: any;
  constructor(private cartService: CartService) {}
  ngOnInit() {
  }
  changeQuantity(val) {
    console.log(val);
    this.product.quantity = val;
    this.cartService.saveCartToLocalStorage();
  }
  removeItem(item) {
    this.cartService.removeItem(item);
  }
}
