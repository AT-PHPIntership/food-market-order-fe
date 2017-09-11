import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-sidebar-order',
  templateUrl: './sidebar-order.component.html',
  styleUrls: ['../order.component.css']
})
export class SidebarOrderComponent implements OnInit {
  cart: any;
  @Output() orderEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cartService: CartService) {
    this.cart = this.cartService;
  }
  order() {
    this.orderEvent.emit(this.cart.carts);
  }
  ngOnInit() {
  }

}
