import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../service/token.service';
import { ShareService } from '../../../service/share.service';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  notify: any;
  cart: CartService;
  constructor(private router: Router,
              private http: Http,
              private tokenService: TokenService,
              private shareService: ShareService,
              private translate: TranslateService,
              private cartService: CartService) {
    if (this.tokenService.getAccessToken() != null) {
      this.getInfo();
    } else {
      this.currentUser = null;
    }
    this.cart = this.cartService;
  }
  ngOnInit() {
  }
  /** Logout system */
  logout() {
    this.tokenService.removeToken();
    this.currentUser = null;
    this.router.navigate(['/home']);
    this.translate.get('success_logout').subscribe((res: string) => {
      this.notify = res;
    });
    swal(this.notify.title, this.notify.message, 'success');
  }
  /** Get information basic of user */
  getInfo() {
    this.tokenService.getDataWithToken(environment.hostname + '/api/user').subscribe((data: any) => {
      this.currentUser = data;
      return data;
    }, (err: any) => {
      if (err.status === 401) {
        /** Access token expired will refresh token*/
        this.tokenService.refreshToken().subscribe((dataToken: any) => {
          this.tokenService.setToken(dataToken);
          this.getInfo();
        }, (err2: any) => {
          /** Refresh token expired*/
          if (err2.status === 401) {
            this.translate.get('login_agian').subscribe((res: string) => {
              this.notify = res;
            });
            swal(this.notify.title, this.notify.message, 'warning');
            this.tokenService.removeToken();
            this.shareService.loginToken(null);
          }
        });
      }
    });
  }
  addCart(product) {
    this.cartService.addItem(product);
  }
}
