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
    this.product.quantity = val;
  }
  removeItem(item) {
    this.cartService.removeItem(item);
  }
}
