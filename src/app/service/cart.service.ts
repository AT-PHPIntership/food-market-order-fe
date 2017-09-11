import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';
import { environment } from '../../environments/environment';
import swal from 'sweetalert2';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class CartService {
  public cart = new Subject<any>();
  cartFoods: any;
  cartMaterials: any;
  notify: any;
  constructor(private http: Http, private translate: TranslateService) {
    let cartFoods, cartMaterials;
    cartFoods = localStorage.getItem('cart-food');
    cartMaterials = localStorage.getItem('cart-material');
    this.cartFoods = cartFoods !== null ? JSON.parse(cartFoods) : [];
    this.cartMaterials = cartMaterials !== null ? JSON.parse(cartMaterials) : [];
    // this.updateCart('App\\Food');
    // this.updateCart('App\\Material');

  }
  addItem(product: any) {
    let existItem: any;
    this.cartFoods.forEach(function (item) {
      if (item.id === product.id && item.type === product.type) {
        existItem = item;
        item.quantity++;
        return false;
      }
    });
    this.cartMaterials.forEach(function (item) {
      if (item.id === product.id && item.type === product.type) {
        existItem = item;
        item.quantity++;
        return false;
      }
    });
    if (existItem === undefined) {
      let cartItem;
      cartItem = Object.assign({}, product);
      cartItem.quantity = 1;
      if (cartItem.type === 'App\\Food') {
        this.cartFoods.push(cartItem);
      }
      if (cartItem.type === 'App\\Material') {
        this.cartMaterials.push(cartItem);
      }
    }
    this.translate.get('success_add_cart', {value: product.name}).subscribe((res: string) => {
      this.notify = res;
    });
    swal(this.notify.title, this.notify.message, 'success');
    this.saveCartToLocalStorage();
  }
  saveCartToLocalStorage() {
    localStorage.setItem('cart-food', JSON.stringify(this.cartFoods));
    localStorage.setItem('cart-material', JSON.stringify(this.cartMaterials));
  }
  getTotalFoods() {
    let total: number;
    total = 0;
    this.cartFoods.forEach(function (item) {
      total += (item.price * item.quantity);
    });
    return total;
  }
  getTotalMaterial() {
    let total: number;
    total = 0;
    this.cartMaterials.forEach(function (item) {
      total += (item.price * item.quantity);
    });
    return total;
  }
  removeItem(item, type) {
    let index;
    if (type === 'App\\Food') {
      index = this.cartFoods.indexOf(item);
      this.cartFoods.splice(index, 1);
    }
    if (type === 'App\\Material') {
      index = this.cartMaterials.indexOf(item);
      this.cartMaterials.splice(index, 1);
    }
    this.saveCartToLocalStorage();
  }
  removeCart() {
    this.cartFoods = [];
    this.cartMaterials = [];
    this.saveCartToLocalStorage();
  }
  updateCart(type) {
    let carts, url;
    carts = [];
    url = '';
    if (type === 'App\\Food') {
      carts = this.cartFoods;
      url = environment.hostname + '/food/getCart';
    }
    if (type === 'App\\Material') {
      carts = this.cartMaterials;
      url = environment.hostname + '/material/getCart';
    }
    let itemIds, value;
    itemIds = [];
    for (value of carts){
      itemIds.push(value.id);
    }
    let headers;
    headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    this.http.post(url, itemIds,
      { headers: headers })
      .map(res => res.json())
      .subscribe((data: any) => {
        console.log(data);
        carts.forEach(function (item) {
          item.price = data.find(trai => trai.id === item.id).price;
        });
        this.saveCartToLocalStorage();
      });
  }
}
