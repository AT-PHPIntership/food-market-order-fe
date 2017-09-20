import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from '../../../service/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../../service/api.service';
import { environment } from '../../../../environments/environment';
import { ItemCategoryComponent } from './item-category/item-category.component';

@Component({
  selector: 'app-listcategory',
  templateUrl: './listcategory.component.html'
})
export class ListCategoryComponent implements OnInit, OnDestroy {
  page: number;
  sub: any;
  @ViewChild(ItemCategoryComponent) productListComponent: ItemCategoryComponent;
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
      let url;
      url = `${environment.hostname}/api/categories?page=${this.page}`;
      this.apiService.apiGet(url).subscribe(data => {
        this.productListComponent.data = data.data;
        this.pagination.init(data);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
