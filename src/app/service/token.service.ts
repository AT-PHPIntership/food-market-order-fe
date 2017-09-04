import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Injectable()
export class TokenService {
  static TOKEN_TYPE = 'TokenType';
  static TOKEN_KEY = 'AccessToken';
  static TOKEN_REFRESH = 'RefreshToken';
  dataRefresh: any;
  public login = new Subject<any>();
  constructor(private http: Http) {
    this.dataRefresh = {
      refresh_token: this.getRefreshToken(),
    };
  }
  isLogged() {
    if (this.getAccessToken() != null) {
      return true;
    }
    return false;
  }
  getTokenType() {
    return Cookie.get(TokenService.TOKEN_TYPE);
  }
  getAccessToken() {
    return Cookie.get(TokenService.TOKEN_KEY);
  }
  getRefreshToken() {
    return  Cookie.get(TokenService.TOKEN_REFRESH);
  }


 /**
  * @brief send request to specify url with option method
  * @details  The method option conatain the method want to send request.
  *   If option content_type default equals true, the function will send the request body with application/json,
  * otherwise the function will send the request without json.
  *   If option accept default equals true, the response must be an application/json type, otherwise
  * the response not must be a application/json.
  * @param url: string the url send request to
  * @param method: string the method send request: GET, POST, PUT.
  * @param data: any data to make request
  * @param content_type: boolean the type of request body is json or not.
  * @param accept: boolean the type of response must be json or not.
  * @return response: any
  */
  requestWithToken(url, method: string, data: any = null, content_type = true, accept = true) {
    let headers;
    headers = new Headers({
      'Authorization': this.getTokenType() + ' ' + this.getAccessToken(),
    });
    if (content_type) {
      headers.append('Content-Type', 'application/json');
    }
    if (accept) {
      headers.append('Accept', 'application/json');
    }
    if (method === 'POST') {
      return this.http.post(url, data, {
        headers: headers
      }).map(res => res.json());
    } else if (method === 'PUT') {

            console.log(data);
            console.log({headers});
      return this.http.put(url, data, {
        headers: headers
      }).map(res => res.json());
    } else {
      return this.http.get(url, {
      headers: headers
    }).map(res => res.json());
  }
  }
  refreshToken() {
      this.removeAccessToken();
      let headers, data, options;
      headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('Accept', 'application/json');
      data = JSON.parse(this.dataRefresh);
      options = new RequestOptions({headers: headers});
      return this.http.post(environment.hostname + '/api/users/refresh', data, options).map(res => res.json());
  }
  setToken(token) {
    Cookie.set(TokenService.TOKEN_TYPE, token.token_type);
    Cookie.set(TokenService.TOKEN_KEY, token.access_token, (token.expires_in / 3600));
    Cookie.set(TokenService.TOKEN_REFRESH, token.refresh_token, 1995);
    this.dataRefresh.refresh_token = token.refresh_token;
  }
  removeAccessToken() {
    Cookie.delete(TokenService.TOKEN_KEY);
  }
  removeToken() {
    Cookie.delete(TokenService.TOKEN_TYPE);
    Cookie.delete(TokenService.TOKEN_KEY);
    Cookie.delete(TokenService.TOKEN_REFRESH);
  }
}
