import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Http, RequestOptions, Headers } from '@angular/http';
import { environment } from '../../environments/environment';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { TranslateService } from '@ngx-translate/core';
import swal from 'sweetalert2';
import { ShareService } from './share.service';

@Injectable()
export class TokenService {
  static TOKEN_KEY = 'AccessToken';
  static TOKEN_REFRESH = 'RefreshToken';
  dataRefresh: any;
  currentUser: any;
  notify: any;
  public login = new Subject<any>();
  constructor(private http: Http, private translate: TranslateService, private shareService: ShareService) {
    this.dataRefresh = {
      refresh_token: this.getRefreshToken(),
    };
    this.getInfo();
  }
  isLogged() {
    if (this.getAccessToken() != null) {
      return true;
    }
    return false;
  }
  /** Get information basic of user */
  getInfo() {
    if (this.getAccessToken() == null) {
      this.currentUser = null;
      return;
    }
    this.getDataWithToken(environment.hostname + '/api/users/me').subscribe((data: any) => {
      this.currentUser = data.data;
    }, (err: any) => {
      if (err.status === 401) {
        /** Access token expired will refresh token*/
        this.refreshToken().subscribe((dataToken: any) => {
          this.setToken(dataToken);
          this.getInfo();
        }, (err2: any) => {
          /** Refresh token expired*/
          if (err2.status === 401) {
            this.translate.get('login_agian').subscribe((res: string) => {
              this.notify = res;
            });
            swal(this.notify.title, this.notify.message, 'warning');
            this.removeToken();
            this.shareService.loginToken(null);
          }
        });
      }
    });
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
  postDataWithToken(url, data) {
    let headers;
    headers = new Headers({
      'Content-type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.getAccessToken(),
    });
    return this.http.post(url, data, {
      headers: headers
    }).map(res => res.json());
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
    Cookie.set(TokenService.TOKEN_KEY, token.access_token, (token.expires_in / 3600));
    Cookie.set(TokenService.TOKEN_REFRESH, token.refresh_token, 1995);
    this.dataRefresh.refresh_token = token.refresh_token;
  }
  removeAccessToken() {
    Cookie.delete(TokenService.TOKEN_KEY);
  }
  removeToken() {
    Cookie.delete(TokenService.TOKEN_KEY);
    Cookie.delete(TokenService.TOKEN_REFRESH);
  }
}
