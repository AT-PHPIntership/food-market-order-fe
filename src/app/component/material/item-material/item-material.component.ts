import { Component, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { PaginationService } from '../../../service/pagination.service';

@Component({
  selector: 'app-item-material',
  templateUrl: './item-material.component.html',
  styleUrls: ['./item-material.component.css']
})
export class ItemMaterialComponent {

  data: any ;

  constructor(private http: Http, private pagination: PaginationService) {
    this.data = [];
  }
}
