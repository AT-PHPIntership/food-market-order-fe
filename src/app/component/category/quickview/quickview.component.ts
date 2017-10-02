import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ShareService } from '../../../service/share.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html',
  styleUrls: ['./quickview.component.css']
})
export class QuickviewComponent implements OnInit {
  param: string;
  product: any;
  @Output() closeEvent = new EventEmitter();
  constructor(private service: ShareService, private translate: TranslateService) {
    this.param = 'none';
  }
  closeViewQuick() {
    this.closeEvent.emit('none');
  }
  ngOnInit() {
  }
  addCart() {
    this.service.addCart(this.product);
  }
}
