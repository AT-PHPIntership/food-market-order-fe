import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class PaginationService {
  pages: any;
  constructor(private http: Http) {
    this.pages = {};
    this.pages.totalPages = 0;
  }
  init(input) {
   this.pages = input;
  }
}
