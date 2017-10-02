import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from '../../../service/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../../service/api.service';
import { environment } from '../../../../environments/environment';
import { FoodProductOfCategoryComponent } from './food-productofcategory/food-productofcategory.component';
import { MaterialProductOfCategoryComponent } from './material-productofcategory/material-productofcategory.component';
import {isUndefined} from "util";

@Component({
  selector: 'app-productofcategory',
  templateUrl: './productofcategory.component.html'
})
export class ProductOfCategoryComponent implements OnInit, OnDestroy {
  page: number;
  sort: any;
  price: any;
  category_id: number;
  sub: any;
  @ViewChild(FoodProductOfCategoryComponent) foodListComponent: FoodProductOfCategoryComponent;
  @ViewChild(MaterialProductOfCategoryComponent) materialListComponent: MaterialProductOfCategoryComponent;
  constructor(private pagination: PaginationService,
              private route: ActivatedRoute,
              private apiService: APIService) {
    this.page = 0;
    this.sort = '';
    this.price = '';
  }

  ngOnInit() {
    this.getPagination('foods');
  }

  paginationFood() {
    this.getPagination('foods');
  }

  paginationMaterial() {
    this.getPagination('materials');
  }

  getPagination(type: string) {
    this.sub = this.route.params.subscribe(params => {
      this.category_id = +params['id'];
      this.sub = this.route.queryParams.subscribe(paramOthers => {
        this.page = +paramOthers['page'];
        this.sort = paramOthers['sort'];
        if (!this.page) {
          this.page = 1;
        }
        if (this.sort === undefined) {
          this.sort = '';
        }
        this.price = paramOthers['price'];
        if (this.price === undefined) {
          this.price = '';
        }
        let url, category_id, price;
        let orderBy;
        orderBy = this.sort !== '' ? `&orderBy=${this.sort}` : '';
        category_id = this.category_id !== undefined ? `category_id:${this.category_id}` : '';
        price = this.price !== '' ? `-price:${this.price}` : '';
        url = `${environment.hostname}/api/${type}?search=|${category_id}${price}&page=${this.page}${orderBy}`;
        this.apiService.apiGet(url).subscribe(data => {
          if (type === 'foods') {
            this.foodListComponent.data = data.data;
          } else {
            this.materialListComponent.data = data.data;
          }
          this.pagination.init(data);
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
