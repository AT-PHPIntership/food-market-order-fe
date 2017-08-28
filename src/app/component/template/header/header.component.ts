import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {TokenService} from '../../../service/token.service';
import {ShareService} from '../../../service/share.service';
import {Http} from '@angular/http';
import swal from 'sweetalert2';
import {Router} from '@angular/router';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: []
})
export class HeaderComponent implements OnInit {
  currentUser: any;
  constructor(private router: Router, private http: Http, private tokenService: TokenService, private shareService: ShareService) {
    this.getInfo();
  }
  ngOnInit() {
  }
  /** Logout system */
  logout() {
    this.tokenService.removeToken();
    this.shareService.loginToken(null);
    this.router.navigate(['/home']);
    swal('Thông báo', 'Đăng xuất thành công!', 'success');
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
            swal('Thông báo', 'Mời bạn đăng nhập lại!', 'error');
            this.tokenService.removeToken();
            this.shareService.loginToken(null);
          }
        });
      }
    });
  }
}
