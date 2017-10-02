import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from '../../service/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../service/api.service';
import { environment } from '../../../environments/environment';
import { ProductsDailyMenuComponent } from './list-products/list-products.component';

@Component({
  selector: 'app-dailymenu',
  templateUrl: './dailymenu.component.html'
})
export class DailyMenuComponent implements OnInit, OnDestroy {
  page: number;
  sort: any;
  sub: any;
  price: any;
  @ViewChild(ProductsDailyMenuComponent) listProductsComponent: ProductsDailyMenuComponent;
  constructor(private pagination: PaginationService,
              private route: ActivatedRoute,
              private apiService: APIService) {
    this.page = 0;
    this.sort = '';
    this.price = '';
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
        this.page = + params['page'];
        if (!this.page) {
            this.page = 1;
        }
        this.sort = params['sort'];
        if (this.sort === undefined) {
          this.sort = '';
        }
      this.price = params['price'];
      if (this.price === undefined) {
        this.price = '';
      }
      let price;
      let orderBy;
      orderBy = this.sort !== '' ? `&orderBy=${this.sort}` : '';
      price = this.price !== '' ? `search=|price:${this.price}&` : '';
      let today, dd, mm, yyyy, current_date;
      today = new Date();
      dd = today.getDate().toString();
      mm = (today.getMonth() + 1).toString();
      yyyy = today.getFullYear().toString();
      current_date = yyyy + '-' + mm + '-' + dd;
      let url;
      url = `${environment.hostname}/api/daily-menus/${current_date}?${price}page=${this.page}${orderBy}`;
      this.apiService.apiGet(url).subscribe(data => {
        this.listProductsComponent.data = [];
        data.data.forEach(item => {
          let daliyItem;
          daliyItem = Object.assign({}, item);
          daliyItem.food.type = 'App\\Food';
          this.listProductsComponent.data.push(daliyItem);
        });
          this.pagination.init(data);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
