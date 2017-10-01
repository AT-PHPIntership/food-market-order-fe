import { Injectable } from '@angular/core';
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
    this.updateCart();
  }

  addItem(data) {
    let product;
    product = data.item;
    console.log(product);
    let existItem: any;
    this.cartFoods.forEach(function (item) {
      if (item.id === product.id && item.type === product.type) {
        existItem = item;
        item.quantityOrder += data.quantity;
        return false;
      }
    });
    this.cartMaterials.forEach(function (item) {
      if (item.id === product.id && item.type === product.type) {
        existItem = item;
        item.quantityOrder += data.quantity;
        return false;
      }
    });
    if (existItem === undefined) {
      let cartItem;
      cartItem = Object.assign({}, product);
      cartItem.quantityOrder = data.quantity;
      if (cartItem.type === 'App\\Food') {
        this.cartFoods.push(cartItem);
      }
      if (cartItem.type === 'App\\Material') {
        this.cartMaterials.push(cartItem);
      }
    }
    this.translate.reloadLang('vi');
    this.translate.get('success_add_cart').subscribe((res: string) => {
      this.notify = res;
    });
    this.translate.get('success_add_cart.message', {name: product.name}).subscribe((res: string) => {
      this.notify.message = res;
      swal(this.notify.title, this.notify.message, 'success');
      this.saveCartToLocalStorage();
    });
  }

  saveCartToLocalStorage() {
    localStorage.setItem('cart-food', JSON.stringify(this.cartFoods));
    localStorage.setItem('cart-material', JSON.stringify(this.cartMaterials));
  }

  getTotalFoods() {
    let total: number;
    total = 0;
    this.cartFoods.forEach(function (item) {
      total += (item.price * item.quantityOrder);
    });
    return total;
  }

  getTotalMaterial() {
    let total: number;
    total = 0;
    this.cartMaterials.forEach(function (item) {
      total += (item.price * item.quantityOrder);
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

  updateCart() {
    let url;
    url = `${environment.hostname}/api/carts`;
    let foodIds, materialIds, value;
    foodIds = [];
    materialIds = [];
    for (value of this.cartFoods) {
      foodIds.push(value.id);
    }
    for (value of this.cartMaterials) {
      materialIds.push(value.id);
    }
    let headers;
    headers = new Headers({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });
    url = `${url}?foods=${foodIds.toString()}&materials=${materialIds.toString()}`;
    this.http.get(url,
      {headers: headers})
      .map(res => res.json())
      .subscribe((data: any) => {
        this.cartFoods.forEach(function (item) {
          let itemNew;
          itemNew = data.data.foods.find(food => food.id === item.id);
          item.name = itemNew.name;
          item.price = itemNew.price;
          item.image = itemNew.image;
        });
        this.cartMaterials.forEach(function (item) {
          let itemNew;
          itemNew = data.data.materials.find(material => material.id === item.id);
          item.name = itemNew.name;
          item.price = itemNew.price;
          item.image = itemNew.image;
        });
        this.saveCartToLocalStorage();
      });
  }
}
