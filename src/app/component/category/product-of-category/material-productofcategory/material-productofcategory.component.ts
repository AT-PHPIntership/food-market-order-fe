import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { PaginationService } from '../../../../service/pagination.service';

@Component({
  selector: 'app-material-productofcategory',
  templateUrl: './material-productofcategory.component.html'
})
export class MaterialProductOfCategoryComponent {

  data: any = [];

  constructor(private http: Http, private pagination: PaginationService) {
  }
}
