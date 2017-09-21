import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { PaginationService } from '../../../../service/pagination.service';

@Component({
  selector: 'app-item-category',
  templateUrl: './item-category.component.html'
})
export class ItemCategoryComponent {

  data: any = [];

  constructor(private http: Http, private pagination: PaginationService) {
  }
}
