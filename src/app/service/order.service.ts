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
    return this.tokenService.postDataWithToken(environment.hostname + '/api/orders',
        data);
  }
}
