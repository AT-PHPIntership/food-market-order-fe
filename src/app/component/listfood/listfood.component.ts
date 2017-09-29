import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from '../../service/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../service/api.service';
import { environment } from '../../../environments/environment';
import { ItemFoodComponent } from './item-food/item-food.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-listfood',
  templateUrl: './listfood.component.html',
  styleUrls: ['./listfood.component.css']
})
export class ListfoodComponent implements OnInit, OnDestroy {
  page: number;
  sub: any;
  @ViewChild(ItemFoodComponent) productListComponent: ItemFoodComponent;
  constructor(private pagination: PaginationService,
              private route: ActivatedRoute,
              private apiService: APIService,
              private productService: ProductService) {
    this.page = 0;
  }

  ngOnInit() {
    this.productService.setProductType('foods');
    this.sub = this.route.queryParams.subscribe(params => {
      this.page = +params['page'];
      if (!this.page) {
        this.page = 1;
      }
      let url;
      url = `${environment.hostname}/api/${this.productService.getProductType()}?page=${this.page}`;
      this.apiService.apiGet(url).subscribe(data => {
        data.data.forEach(item => {
          let food;
          food = Object.assign({}, item);
          food.type = 'App\\Food';
          this.productListComponent.data.push(food);
        });
        this.pagination.init(data);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
