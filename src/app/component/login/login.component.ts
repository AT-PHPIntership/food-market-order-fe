import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { ShareService } from '../../service/share.service';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email: string;
  data: any;
  notify: any;
  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
              private http: Http,
              private tokenService: TokenService,
              private service: ShareService,
              private router: Router,
              private translate: TranslateService) {
    this.loginForm = this.formBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {
  }
  /** Login system */
  login(model: any) {
    let data;
    data = {
      'email': model.email,
      'password': model.password,
    };
    let headers, options;
    headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');
    options = new RequestOptions({headers: headers});
    this.http.post(environment.hostname + '/api/users/login', data, options).map(res => res.json()).subscribe((a: any) => {
      this.tokenService.setToken(a.data);
      this.service.loginToken(a.data.access_token);
      this.translate.get('success_login').subscribe((res: string) => {
        this.notify = res;
      });
      swal(this.notify.title, this.notify.message, 'success');
      this.router.navigate(['/home']);
    }, (err: any) => {
      if (err.status === 401) {
        this.translate.get('error_unauthorized').subscribe((res: string) => {
          this.notify = res;
        });
        swal(this.notify.title, this.notify.message, 'error');
      } else {
        this.translate.get('error_bad_request').subscribe((res: string) => {
          this.notify = res;
        });
        swal(this.notify.title, this.notify.message, 'error');
      }
    });
  }
}
