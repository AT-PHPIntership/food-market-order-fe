import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from '../../service/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../service/api.service';
import { environment } from '../../../environments/environment';
import { ItemMaterialComponent } from './item-material/item-material.component';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit, OnDestroy {
  page: number;
  sub: any;
  @ViewChild(ItemMaterialComponent) productListComponent: ItemMaterialComponent;
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
      url = `${environment.hostname}/api/materials?page=${this.page}`;
      this.apiService.apiGet(url).subscribe(res => {
        this.productListComponent.data = res.data;
        this.pagination.init(res);
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
