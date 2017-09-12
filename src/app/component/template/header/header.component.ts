///<reference path="../../../service/token.service.ts"/>
import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../../service/token.service';
import { ShareService } from '../../../service/share.service';
import { Http } from '@angular/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  token: TokenService;
  notify: any;
  constructor(private router: Router,
              private http: Http,
              private tokenService: TokenService,
              private shareService: ShareService,
              private translate: TranslateService) {
    this.token = this.tokenService;
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
}
