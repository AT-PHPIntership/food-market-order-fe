import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

@Injectable()
export class APIService {

    constructor (private http: Http) { }

    apiGet = (url, condition_value) => {
        url_request = url.toString() + ((condition_value == null) ? '' : ('/' + condition_value.toString()));
        return this.http
            .get(url_request)
            .map(res => res.json());
    }
}
