import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

@Injectable()
export class ShareService {
  public login = new Subject<any>();
  public cart = new Subject<any>();
  public viewQuick = new Subject<any>();
  constructor(private http: Http) {
  }
  loginToken(data) {
    this.login.next(data);
  }
  addCart(item: any, quantity = 1 ) {
    let data;
    data = {item: item, quantity: quantity};
    this.cart.next(data);
  }
  openQuickView(data) {
    this.viewQuick.next(data);
  }
}
