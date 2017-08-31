import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { TokenService} from '../service/token.service';
import swal from 'sweetalert2';
import { Observable } from 'rxjs/Observable';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class LoggedGuard implements CanActivate {
  notify: any;
  constructor(private tokenService: TokenService,
              private router: Router,
              private translate: TranslateService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.tokenService.isLogged()) {
      return true;
    }
    this.translate.get('invite_login').subscribe((res: string) => {
      this.notify = res;
    });
    swal(this.notify.title, this.notify.message, 'error');
    this.router.navigate(['/login']);
    return false;
  }
}
