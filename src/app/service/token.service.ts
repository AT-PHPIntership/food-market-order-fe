import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';

@Injectable()
export class TokenService {
  static TOKEN_KEY = 'AccessToken';
  static TOKEN_REFRESH = 'RefreshToken';
  static TOKEN_EXPIRES = 'Expires';
  dataRefresh: any;
  public login = new Subject<any>();
  constructor(private http: Http) {
    this.dataRefresh = {
      grant_type: 'refresh_token',
      refresh_token: this.getRefreshToken(),
      client_id: environment.client_id,
      client_secret: environment.client_secret,
      scope: ''
    };
  }
  getAccessToken() {
    return localStorage.getItem(TokenService.TOKEN_KEY);
  }
  getRefreshToken() {
    return localStorage.getItem(TokenService.TOKEN_REFRESH);
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
      return this.http.post(environment.hostname + '/oauth/token', data, options).map(res => res.json());
  }
  setToken(token) {
    let expireDate;
    expireDate = new Date();
    expireDate.setSeconds(expireDate.getSeconds() + token.expires_in);
    localStorage.setItem(TokenService.TOKEN_KEY, token.access_token);
    localStorage.setItem(TokenService.TOKEN_EXPIRES, expireDate);
    localStorage.setItem(TokenService.TOKEN_REFRESH, token.refresh_token);
    this.dataRefresh.refresh_token = token.refresh_token;
  }
  removeToken() {
    localStorage.removeItem(TokenService.TOKEN_KEY);
    localStorage.removeItem(TokenService.TOKEN_EXPIRES);
    localStorage.removeItem(TokenService.TOKEN_REFRESH);
  }
}
