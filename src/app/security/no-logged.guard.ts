import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService } from '../service/token.service';
import { ShareService } from '../service/share.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class NoLoggedGuard implements CanActivate {
  constructor(private tokenService: TokenService,
              private shareService: ShareService,
              private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.tokenService.isLogged()) {
      return true;
    }
    this.router.navigate(['/home']);
    return false;
  }
}
