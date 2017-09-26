import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import { TokenService } from '../../service/token.service';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import { ShareService } from '../../service/share.service';
import swal from 'sweetalert2';
import { environment } from '../../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { DropzoneConfig, DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
import { Subject } from 'rxjs/Subject';

@Component({
    selector: 'app-user',
    templateUrl: './userprofile.component.html',
    styleUrls: ['./userprofile.component.css'],
})
export class UserProfileComponent implements OnInit {
    data: any;
    updateForm: FormGroup;
    responseData: any;
    notify: any;
    imageDragMessage: any;
    imageName: string = null;
    i: number;
    ordersHistory: any;
    constructor(public tokenService: TokenService,
                private formBuilder: FormBuilder,
                private http: Http,
                private service: ShareService,
                private router: Router,
                private translate: TranslateService,
                public config: DropzoneConfig) {
        this.i = 0;
        this.config.headers = {
                'Accept': 'application/json',
                'Authorization': this.tokenService.getTokenType() + ' ' + this.tokenService.getAccessToken()
        };
        this.updateForm = this.formBuilder.group({
            full_name: new FormControl(this.tokenService.currentUser.full_name, [Validators.required]),
            email: new FormControl(this.tokenService.currentUser.email, []),
            birthday: new FormControl(this.tokenService.currentUser.birthday, [Validators.required]),
            address: new FormControl(this.tokenService.currentUser.address, [Validators.required]),
            phone_number: new FormControl(this.tokenService.currentUser.phone_number, []),
            gender: new FormControl(this.tokenService.currentUser.gender.toString(), []),
            password: new FormControl('', []),
            password_confirmation: new FormControl('', [])
        }, {
            validator: this.MatchPassword
        });
        this.translate.get('image_drag_message').subscribe((res: string) => {
           this.imageDragMessage = res;
        });
        this.tokenService.requestWithToken(`${environment.hostname}/api/orders`, 'GET').subscribe((res: any) => {
            this.ordersHistory = res.data;
            console.log(res.data);
        });
    }

    ngOnInit() {
        let i = 0;
        this.config.init = function () {
            i = i + 1;
            if (localStorage.getItem('imageName') != null && i === 1) {
                const mockFile = {
                    name: 'Image detail'
                };
                this.emit('addedfile', mockFile);
                this.emit('thumbnail', mockFile, `${environment.hostname}/images/users/${localStorage.getItem('imageName')}`);
                this.emit('complete', mockFile);
            }
        };
    }

    /** Registered system */
    update(model: any) {
        this.data = {
            'full_name': model.full_name,
            'birthday': model.birthday,
            'address': model.address,
            'gender': model.gender,
            'phone_number': model.phone_number,
            'password': model.password,
            'password_confirmation': model.password_confirmation,
            'image': this.imageName
    };

        this.tokenService.requestWithToken(`${environment.hostname}/api/users/me`, 'PUT', this.data).subscribe((resJson: any) => {
            this.responseData = resJson;
            this.translate.get('success_update').subscribe((res: string) => {
                this.notify = res;
            });
            swal(this.notify.title, this.notify.message, 'success');
        }, (err: any) => {
            if (err.status !== 422) {
                this.translate.get('error_update').subscribe((res: string) => {
                    this.notify = res;
                });
                swal(this.notify.title, this.notify.message, 'error');
            } else {
                this.translate.get('error_validation_update').subscribe((res: string) => {
                    this.notify = res;
                });
                swal(this.notify.title, this.notify.message, 'error');
            }
        });
        if (localStorage.getItem('imageName') != null) {
            localStorage.removeItem('imageName');
        }
        this.tokenService.getInfo();
        this.reset();
    }

    reset() {
        this.updateForm = this.formBuilder.group({
            full_name: new FormControl(this.tokenService.currentUser.full_name, [Validators.required]),
            email: new FormControl(this.tokenService.currentUser.email, []),
            birthday: new FormControl(this.tokenService.currentUser.birthday, [Validators.required]),
            address: new FormControl(this.tokenService.currentUser.address, [Validators.required]),
            phone_number: new FormControl(this.tokenService.currentUser.phone_number, []),
            gender: new FormControl(this.tokenService.currentUser.gender, []),
            password: new FormControl('', []),
            password_confirmation: new FormControl('', [])
        }, {
            validator: this.MatchPassword
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

    onUploadError(event: any) {
    }

    onUploadSuccess(event: any) {
        this.imageName = event[1];
        localStorage.setItem('imageName', this.imageName);
    }

    onRemoveFile(event: any) {
        const data = {
            'file_name': this.imageName
        };

        this.tokenService.requestWithToken(`${environment.hostname}/api/users/remove-image`, 'DELETE', data)
        .subscribe((res: any) => {});
        localStorage.removeItem('imageName');
        this.imageName = null;
    }
}
