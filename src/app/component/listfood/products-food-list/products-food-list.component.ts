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

  private apiUrl = 'http://laravel-foodorder.com/api/foods';
  data: any = {};

  constructor(private http: Http, private pagination: PaginationService) {
    this.getFoods();
    this.getData();
  }
  getData() {
    return this.http.get(this.apiUrl)
        .map((res: Response) => res.json())
  }

  getFoods() {
    this.getData().subscribe(data=> {
      console.log(data);
      this.data = data;
      this.pagination.init(data);
    })
  }
}
