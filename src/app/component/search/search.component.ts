import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductListSearchComponent } from './product-list-search/product-list-search.component';
import { PaginationService } from '../../service/pagination.service';
import { environment } from '../../../environments/environment';
import { Http } from '@angular/http';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class MainSearchComponent implements OnInit {

  key: string;
  page: number;
  sub: any;
  type: any;
  @ViewChild(ProductListSearchComponent) productListSearch: ProductListSearchComponent;
  constructor(private route: ActivatedRoute,
              private pagination: PaginationService,
              private http: Http,
              private router: Router, public productService: ProductService) {
  }

  ngOnInit() {
      this.route.params.subscribe(params => {
          this.type = params['type'] || 'foods';
          this.sub = this.route.queryParams.subscribe(querParams => {
            this.page = querParams['page'] || 1;
            this.key = querParams['key'] || '';
            this.getListResult(this.key, this.page);
        });
      });
  }

  getListResult(key: string, page: number) {
      let url;
      url = `${environment.hostname}/api/${this.type}?search=${key}&page=${page}&size=12`;
      this.http.get(url).map(res => res.json()).subscribe((data: any) => {
          this.productListSearch.listResult = [];
          if (this.type === 'foods') {
            data.data.forEach(item => {
              let food;
              food = Object.assign({}, item);
              food.type = 'App\\Food';
              this.productListSearch.listResult.push(food);
            });
          }
          if (this.type === 'materials') {
            data.data.forEach(item => {
              let material;
              material = Object.assign({}, item);
              material.type = 'App\\Material';
              this.productListSearch.listResult.push(material);
            });
          }
          this.pagination.init(data);
      }, (err: any) => {
      });
  }
}
