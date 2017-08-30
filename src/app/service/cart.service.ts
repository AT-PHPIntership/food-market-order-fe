import {Injectable, OnDestroy} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';

@Injectable()
export class CartService {
  public login = new Subject<any>();
  carts: any;
  constructor(private http: Http) {
    let carts;
    carts = localStorage.getItem('cart');
    this.carts = carts !== null ? JSON.parse(carts) : [];
  }
  getCarts() {
    localStorage.getItem('carts');
  }
  addItem(product: any) {
    let existItem: any;
    this.carts.forEach(function (item) {
      if (item.id === product.id) {
        existItem = item;
        item.quantity++;
        return false;
      }
    });
    if (existItem === undefined) {
      let cartItem;
      cartItem = Object.assign({}, product);
      cartItem.quantity = 1;
      this.carts.push(cartItem);
    }
    this.saveCartToLocalStorage();
  }
  saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(this.carts));
  }
  getTotal() {
    let total: number;
    total = 0;
    this.carts.forEach(function (item) {
      total += (item.price * item.quantity);
    });
    return total;
  }
  removeItem(item) {
    let index;
    index = this.carts.indexOf(item);
    this.carts.splice(index, 1);
    this.saveCartToLocalStorage();
  }
  removeCart() {
    this.carts = [];
    this.saveCartToLocalStorage();
  }
}
