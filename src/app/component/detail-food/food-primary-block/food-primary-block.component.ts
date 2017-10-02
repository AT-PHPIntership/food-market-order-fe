import { Component } from '@angular/core';
import { ShareService } from '../../../service/share.service';
import {FacebookService, InitParams, UIParams, UIResponse} from 'ngx-facebook';

@Component({
  selector: 'app-food-primary-block',
  templateUrl: './food-primary-block.component.html',
  styleUrls: ['./food-primary-block.component.css']
})
export class FoodPrimaryBlockComponent {

  item: any;
  quantity: number;
  constructor(private shareService: ShareService,
              private fb: FacebookService) {
    this.item = null;
    this.quantity = 1;
    // const initParams: InitParams = {
    //   appId      : '129604284344795',
    //   xfbml      : true,
    //   version    : 'v2.10'
    // };
    //
    // fb.init(initParams);
  }
  addCart() {
    this.shareService.addCart(this.item, this.quantity);
  }
  share() {
    let params: UIParams;
    params = {
      href: location.href,
      method: 'share'
    };
    this.fb.ui(params)
      .then((res: UIResponse) => console.log(res))
      .catch((e: any) => console.error(e));
  }
}
