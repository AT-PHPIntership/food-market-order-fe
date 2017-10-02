import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/Rx';
import { environment } from '../../environments/environment';
import {TokenService} from './token.service';

@Injectable()
export class OrderService {
  constructor(private http: Http, private tokenService: TokenService) {
  }
  sendOrder(data) {
    return this.tokenService.requestWithToken(`${environment.hostname}/api/orders`, 'POST',
      data);
  }
  getItemByOrder(id) {
    return this.tokenService.requestWithToken(`${environment.hostname}/api/orders/${id}/items`, 'GET');
  }
  deleteOrder(id) {
    return this.tokenService.requestWithToken(`${environment.hostname}/api/orders/${id}`, 'DELETE');
  }
  deleteOrderItem(id) {
    return this.tokenService.requestWithToken(`${environment.hostname}/api/order-items/${id}`, 'DELETE');
  }
  updateOrder(id, data) {
    return this.tokenService.requestWithToken(`${environment.hostname}/api/orders/${id}`, 'PUT', data);  }
}
