import { Component } from '@angular/core';

@Component({
  selector: 'app-primary-block',
  templateUrl: './primary-block.component.html',
  styleUrls: ['./primary-block.component.css']
})
export class PrimaryBlockComponent {

  item: any;
  constructor() {
    this.item = null;
  }

}
