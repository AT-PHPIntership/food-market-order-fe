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
  sub: any;
  @ViewChild(ProductsDailyMenuComponent) listProductsComponent: ProductsDailyMenuComponent;
  constructor(private pagination: PaginationService,
              private route: ActivatedRoute,
              private apiService: APIService) {
    this.page = 0;
  }

  ngOnInit() {
    this.sub = this.route.queryParams.subscribe(params => {
      this.page = +params['page'];
      if (!this.page) {
        this.page = 1;
      }
    let today = new Date();
	let dd = today.getDate().toString();
	let mm = (today.getMonth()+1).toString();
	let yyyy = today.getFullYear().toString();
	let current_date = yyyy + '-' + mm + '-' + dd;
	let url;
    url = environment.hostname + '/api/daily-menus/' + current_date + '?page=' + this.page;
      this.apiService.apiGet(url).subscribe(data => {
        this.listProductsComponent.data = data.data;
        this.pagination.init(data);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
