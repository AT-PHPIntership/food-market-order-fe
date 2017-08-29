import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class TokenService {
  static TOKEN_KEY = 'AccessToken';
  static TOKEN_REFRESH = 'RefreshToken';
  dataRefresh: any;
  public login = new Subject<any>();
  constructor(private http: Http) {
    this.dataRefresh = {
      refresh_token: this.getRefreshToken(),
    };
  }
  getAccessToken() {
    return Cookie.get(TokenService.TOKEN_KEY);
  }
  getRefreshToken() {
    return  Cookie.get(TokenService.TOKEN_REFRESH);
  }
  getDataWithToken(url) {
    let headers;
    headers = new Headers({
      'Authorization': 'Bearer ' + this.getAccessToken(),
    });
    return this.http.get(url, {
      headers: headers
    }).map(res => res.json());
  }
  refreshToken() {
      let headers, data, options;
      headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      data = JSON.parse(this.dataRefresh);
      options = new RequestOptions({headers: headers});
      return this.http.post(environment.hostname + '/users/refresh', data, options).map(res => res.json());
  }
  setToken(token) {
    let expireDate;
    expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + token.expires_in);
    Cookie.set(TokenService.TOKEN_KEY, token.access_token, token.expires_in);
    Cookie.set(TokenService.TOKEN_REFRESH, token.refresh_token);
    this.dataRefresh.refresh_token = token.refresh_token;
  }
  removeToken() {
    Cookie.delete(TokenService.TOKEN_KEY);
    Cookie.delete(TokenService.TOKEN_REFRESH);
  }
}
