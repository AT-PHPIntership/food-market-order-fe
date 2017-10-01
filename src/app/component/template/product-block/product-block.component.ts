import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from '../../../service/share.service';
import { ProductService } from '../../../service/product.service';

@Component({
  selector: 'app-product-block',
  templateUrl: './product-block.component.html',
  styleUrls: ['./product-block.component.css']
})
export class ProductBlockComponent implements OnInit {
  @Input() product: any;
  @Input() index: any;
  @Input() size: any;
  @Input() class: any;
  type: string;
  constructor(private service: ShareService, private productService: ProductService) {
    // this.type = this.productService.getProductType();
    setTimeout(() => {
      this.type = this.product.type === 'App\\Food' ? 'foods' : 'materials';
    }, 1000);
  }
  ngOnInit() {
  }
  addCart() {
    this.service.addCart(this.product);
  }
  openViewQuick() {
    this.service.openQuickView(this.product);
  }
}
