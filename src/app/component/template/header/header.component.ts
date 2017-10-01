import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../service/token.service';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token: TokenService;
  notify: any;
  key: string;
  cart: CartService;
  constructor(private router: Router,
              private tokenService: TokenService,
              private translate: TranslateService,
              private cartService: CartService) {
    this.token = this.tokenService;
    this.cart = cartService;
  }
  ngOnInit() {
  }
  login(data) {
    this.tokenService.setToken(data);
    this.tokenService.getInfo();
  }
  /** Logout system */
  logout() {
    this.tokenService.removeToken();
    this.tokenService.currentUser = null;
    this.router.navigate(['/home']);
    this.translate.get('success_logout').subscribe((res: string) => {
      this.notify = res;
    });
    swal(this.notify.title, this.notify.message, 'success');
  }
  addCart(product) {
    this.cartService.addItem(product);
  }
  search(key) {
    this.router.navigate(['/search'], { queryParams: { key: key }});
  }
}
