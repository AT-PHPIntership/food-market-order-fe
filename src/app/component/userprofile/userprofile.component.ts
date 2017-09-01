import {AfterContentChecked, Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators, AbstractControl} from '@angular/forms';
import {Http, RequestOptions} from '@angular/http';
import {TokenService} from '../../service/token.service';
import {Router} from '@angular/router';
import 'rxjs/Rx';
import {ShareService} from '../../service/share.service';
import swal from 'sweetalert2';
import {environment} from '../../../environments/environment';
import {TranslateService} from '@ngx-translate/core';

@Component({
    moduleId: module.id,
    selector: 'app-register',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css'],
})
export class UserProfileComponent implements OnInit {
    data: any;
    updateForm: FormGroup;
    responseData: any;
    notify: any;

    constructor(private tokenService: TokenService,
                private formBuilder: FormBuilder,
                private http: Http,
                private service: ShareService,
                private router: Router,
                private translate: TranslateService) {
        this.updateForm = this.formBuilder.group({
            full_name: new FormControl('', [Validators.required]),
            birthday: new FormControl('', [Validators.required]),
            address: new FormControl('', [Validators.required]),
            phone_number: new FormControl('', []),
            password: new FormControl('', []),
            password_confirmation: new FormControl('', [])
        }, {
            validator: this.MatchPassword
        });
    }

    ngOnInit() {
    }

    /** Registered system */
    register(model: any) {
        let data;
        data = {
            'full_name': model.full_name,
            'birthday': model.birthday,
            'address': model.address,
            'gender': model.gender,
            'phone_number': model.phone_number,
            'password': model.password,
            'password_confirmation': model.password_confirmation
        };

        let data1;
        data1 = {
            'full_name': 'dungvan',
            'birthday': '12-12-1994',
            'address': 'dien duong',
            'gender': '1',
            'phone_number': '123456123'
        };
        this.tokenService.requestWithToken(environment.hostname + '/api/users/me', data1).subscribe((resJson: any) => {
            this.responseData = resJson;
            this.translate.get('success_register').subscribe((res: string) => {
                this.notify = res;
            });
            swal(this.notify.title, this.notify.message, 'success');
            this.router.navigate(['/login']);
        }, (err: any) => {
            if (err.status !== 422) {
                this.translate.get('error_register').subscribe((res: string) => {
                    this.notify = res;
                });
                swal(this.notify.title, this.notify.message, 'error');
            } else {
                this.translate.get('error_validation_register').subscribe((res: string) => {
                    this.notify = res;
                });
                swal({
                    title: this.notify.title,
                    type: 'error',
                    html:
                    '<b class="text-danger">' + this.notify.message + ' </b> </br>' +
                    '<ul>' + '</ul>'
                });
            }
        });
    }

    MatchPassword(AC: AbstractControl) {
        let password, confirmPassword;
        password = AC.get('password').value; // to get value in input tag
        confirmPassword = AC.get('password_confirmation').value; // to get value in input tag
        if (password !== confirmPassword) {
            AC.get('password_confirmation').setErrors({MatchPassword: true});
        } else {
            return null;
        }
    }
}
