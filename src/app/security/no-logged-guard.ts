import {CanActivate, Router} from '@angular/router';
import { Injectable } from '@angular/core';
import {TokenService} from '../service/token.service';
import {ShareService} from '../service/share.service';

@Injectable()
export default class NoLoggedGuard implements CanActivate {
  constructor(private tokenService: TokenService,
              private shareService: ShareService,
              private router: Router) {}
  canActivate() {
    if (!this.tokenService.isLogged()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
