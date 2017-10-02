import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from '../../service/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../service/api.service';
import { environment } from '../../../environments/environment';
import { ItemMaterialComponent } from './item-material/item-material.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit, OnDestroy {
  page: number;
  sort: any;
  sub: any;
  @ViewChild(ItemMaterialComponent) productListComponent: ItemMaterialComponent;
  constructor(private pagination: PaginationService,
              private route: ActivatedRoute,
              private apiService: APIService,
              private productService: ProductService) {
    this.page = 0;
    this.sort = '';
  }

  ngOnInit() {
    this.productService.setProductType('materials');
    this.sub = this.route.queryParams.subscribe(params => {
      this.page = +params['page'];
      if (!this.page) {
        this.page = 1;
      }
      this.sort = params['sort'];
      if (this.sort === undefined) {
        this.sort = '';
      }
      let url;
      url = `${environment.hostname}/api/${this.productService.getProductType()}?page=${this.page}&orderBy=${this.sort}`;
      this.apiService.apiGet(url).subscribe(res => {
        this.productListComponent.data = [];
        res.data.forEach(item => {
          let material;
          material = Object.assign({}, item);
          material.type = 'App\\Material';
          this.productListComponent.data.push(material);
        });
        this.pagination.init(res);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
