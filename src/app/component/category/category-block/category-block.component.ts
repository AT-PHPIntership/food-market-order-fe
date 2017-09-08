import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from '../../../service/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../../service/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-category-block',
  templateUrl: './category-block.component.html',
  styleUrls: ['./category-block.component.css']
})
export class CategoryBlockComponent implements OnInit {
	categories: any;
	category_total: number;
	dailymenu_total: number;
	food_total: number;
	material_total: number;
	supplier_total: number;
  constructor(private pagination: PaginationService,
              private route: ActivatedRoute,
              private apiService: APIService) {
  }

  ngOnInit() {
  	let url;
  	url = environment.hostname + '/api/categories';
    this.apiService.apiGet(url).subscribe(data => {
    	this.category_total = data.total ? data.total : 0;
    	this.categories = data.data;
    });
    url = environment.hostname + '/api/suppliers';
    this.apiService.apiGet(url).subscribe(data => {
    	this.supplier_total = data.total ? data.total : 0;
    });
    url = environment.hostname + '/api/foods';
    this.apiService.apiGet(url).subscribe(data => {
    	this.food_total = data.total ? data.total : 0;
    });
    url = environment.hostname + '/api/materials';
    this.apiService.apiGet(url).subscribe(data => {
    	this.material_total = data.total ? data.total : 0;
    });
    url = environment.hostname + '/api/daily-menus';
    this.apiService.apiGet(url).subscribe(data => {
    	this.dailymenu_total = data.total ? data.total : 0;
    });
  }
}
