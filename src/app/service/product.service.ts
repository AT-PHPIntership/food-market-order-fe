import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs/Subject';
import { Http } from '@angular/http';

@Injectable()
export class ProductService {
    public productType: any;
    constructor(private http: Http, private translate: TranslateService) {
    }

    getProductType() {
        return this.productType;
    }

    setProductType(type: string) {
        this.productType = type;
    }
}
