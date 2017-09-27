import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../service/api.service';
import { environment } from '../../../environments/environment';
import { MaterialPrimaryBlockComponent } from './material-primary-block/material-primary-block.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-detail-material',
  templateUrl: './detail-material.component.html',
  styleUrls: ['./detail-material.component.css']
})
export class DetailMaterialComponent implements OnInit, OnDestroy {
  id: number;
  sub: any;
  @ViewChild(MaterialPrimaryBlockComponent) block: MaterialPrimaryBlockComponent;
  constructor(private route: ActivatedRoute,
              private apiService: APIService,
              private productService: ProductService) {
  }

  ngOnInit() {
    this.productService.setProductType('materials');
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      let url;
      url = `${environment.hostname}/api/${this.productService.getProductType()}/${this.id}`;
      this.apiService.apiGet(url).subscribe(data => {
        this.block.item = data;
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
