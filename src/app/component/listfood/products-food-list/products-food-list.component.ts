import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import {PaginationService} from "../../../service/pagination.service";

@Component({
  selector: 'app-products-food-list',
  templateUrl: './products-food-list.component.html',
  styleUrls: ['./products-food-list.component.css']
})
export class ProductsFoodListComponent{

  data: any = [];

  constructor(private http: Http, private pagination: PaginationService) {
  }
}
