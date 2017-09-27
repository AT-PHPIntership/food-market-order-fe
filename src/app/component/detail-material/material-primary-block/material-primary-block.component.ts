import { Component } from '@angular/core';

@Component({
  selector: 'app-material-primary-block',
  templateUrl: './material-primary-block.component.html',
  styleUrls: ['./material-primary-block.component.css']
})
export class MaterialPrimaryBlockComponent {

  item: any;
  constructor() {
    this.item = null;
  }

}
