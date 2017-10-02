import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../service/api.service';
import { environment } from '../../../environments/environment';
import { FoodPrimaryBlockComponent } from './food-primary-block/food-primary-block.component';
import { ProductService } from '../../service/product.service';

@Component({
  selector: 'app-detail-food',
  templateUrl: './detail-food.component.html',
  styleUrls: ['./detail-food.component.css']
})
export class DetailFoodComponent implements OnInit, OnDestroy {
  id: number;
  sub: any;
  itemsRelated: any;
  @ViewChild(FoodPrimaryBlockComponent) block: FoodPrimaryBlockComponent;
  constructor(private route: ActivatedRoute,
              private apiService: APIService,
              private productService: ProductService) {
    this.itemsRelated = [];
  }

  ngOnInit() {
    this.productService.setProductType('foods');
    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
      let url;
      url = `${environment.hostname}/api/${this.productService.getProductType()}/${this.id}`;
      this.apiService.apiGet(url).subscribe(data => {
        let food;
        food = Object.assign({}, data);
        food.type = 'App\\Food';
        this.block.item = food;
        url = `${environment.hostname}/api/${this.productService.getProductType()}?search=|category_id:${food.category_id}&page=1`;
        this.apiService.apiGet(url).subscribe(data2 => {
          this.itemsRelated = data2.data;
        });
      });
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
