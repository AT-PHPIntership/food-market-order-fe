import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { PaginationService } from '../../../../service/pagination.service';

@Component({
  selector: 'app-food-productofcategory',
  templateUrl: './food-productofcategory.component.html'
})
export class FoodProductOfCategoryComponent {

  data: any = [];

  constructor(private http: Http, private pagination: PaginationService) {
  }
}
