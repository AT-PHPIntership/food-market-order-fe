import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';

@Injectable()
export class OrderService {
  constructor(private http: Http) {
  }
  sendOrder(data) {
    return this.http.post(environment.hostname + '/order/create',
        data).map(res => res.json());
  }
}
