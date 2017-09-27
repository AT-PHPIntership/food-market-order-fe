import { Component } from '@angular/core';

@Component({
  selector: 'app-food-primary-block',
  templateUrl: './food-primary-block.component.html',
  styleUrls: ['./food-primary-block.component.css']
})
export class FoodPrimaryBlockComponent {

  item: any;
  constructor() {
    this.item = null;
  }

}
