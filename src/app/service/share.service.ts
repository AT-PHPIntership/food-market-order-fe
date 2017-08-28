import { Injectable } from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Http} from '@angular/http';

@Injectable()
export class ShareService {
  public login = new Subject<any>();
  constructor(private http: Http) {
  }
  loginToken(data) {
    this.login.next(data);
  }
}
