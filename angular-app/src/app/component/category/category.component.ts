import {Component, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  @Output() viewQuick: string ;
  constructor() {
    this.viewQuick = 'none';
  }

  ngOnInit() {
  }
  openViewQuick() {
    this.viewQuick = 'block';
  }
  closeViewQuick() {
    this.viewQuick = 'done';
  }
}
