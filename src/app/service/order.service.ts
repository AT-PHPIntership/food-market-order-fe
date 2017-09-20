import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class OrderService {
  constructor(private http: Http) {
  }
  sendOrder(data) {
    return this.http.post(environment.hostname + '/api/orders',
        data).map(res => res.json());
  }
  getItemByOrder(id) {
    return this.http.get(environment.hostname + '/api/orders/' + id + '/getItems').map(res => res.json());
  }
}
