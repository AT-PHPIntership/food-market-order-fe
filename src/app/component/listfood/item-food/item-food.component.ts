import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { PaginationService } from '../../../service/pagination.service';

@Component({
  selector: 'app-item-food',
  templateUrl: './item-food.component.html',
  styleUrls: ['./item-food.component.css']
})
export class ItemFoodComponent {

  data: any = [];

  constructor(private http: Http, private pagination: PaginationService) {
  }
}
