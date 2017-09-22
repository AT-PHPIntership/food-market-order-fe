import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CartService } from '../../../service/cart.service';
import {ActivatedRoute, PRIMARY_OUTLET, Router} from '@angular/router';

@Component({
  selector: 'app-sidebar-order',
  templateUrl: './sidebar-order.component.html',
  styleUrls: ['../order.component.css']
})
export class SidebarOrderComponent implements OnInit {
  cart: any;
  urlBase: any;
  @Output() orderEvent: EventEmitter<any> = new EventEmitter<any>();
  constructor(private cartService: CartService, private router: Router) {
    this.urlBase = this.router.url;
    this.cart = this.cartService;
  }
  order() {
    let items;
    items = [];
    if (this.urlBase === '/checkout/foods') {
      this.cart.cartFoods.forEach(item => {
        items.push({id: item.id, quantity: item.quantityOrder, type: 'App\\Food'});
      });
    } else {
      this.cart.cartMaterials.forEach(item => {
        items.push({id: item.id, quantity: item.quantityOrder, type: 'App\\Material'});
      });
    }
    this.orderEvent.emit(items);
  }
  ngOnInit() {
  }
}
