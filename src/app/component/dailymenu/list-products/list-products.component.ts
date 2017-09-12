import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../service/api.service';
import { PaginationService } from '../../../service/pagination.service';

@Component({
  selector: 'app-dailymenu-list',
  templateUrl: './list-products.component.html'
})
export class ProductsDailyMenuComponent {
    data: any;
    constructor () {
      this.data = [];
    }
}
