import { Component, OnInit, ViewChild } from '@angular/core';
import { MainOrderComponent } from './main-order/main-order.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  @ViewChild(MainOrderComponent) main: MainOrderComponent;
  constructor() { }

  ngOnInit() {
  }
  submitOrder(items) {
    // console.log(items);
    this.main.order(items);
  }

}
