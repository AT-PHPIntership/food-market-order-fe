import { Component, Input, OnInit } from '@angular/core';
import { ShareService } from '../../../service/share.service';

@Component({
  selector: 'app-dailymenu-block',
  templateUrl: './dailymenu-block.component.html'
})
export class DailyMenuBlockComponent implements OnInit {
  @Input() product: any;
  @Input() index: any;
  @Input() size: any;
  @Input() class: any;
  constructor(private service: ShareService) { }
  ngOnInit() {
  }
  addCart() {
    this.service.addCart(this.product.food);
  }
}
