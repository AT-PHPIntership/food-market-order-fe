import {Component, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-quickview',
  templateUrl: './quickview.component.html'
})
export class QuickviewComponent implements OnInit {
  display: string;
  @Input() param: string;
  constructor() {
    this.display = 'block';
  }
  @Output() closeViewQuick() {
    this.param = 'none';
  }
  ngOnInit() {
  }
}
