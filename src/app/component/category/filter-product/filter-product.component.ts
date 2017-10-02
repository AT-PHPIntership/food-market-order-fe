import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter-product',
  templateUrl: './filter-product.component.html',
  styleUrls: ['./filter-product.component.css']
})
export class FilterProductComponent implements OnInit {
  price: any;
  constructor() { }

  ngOnInit() {
  }
  changeSortPrice(price) {
    this.price = price;
  }
}
