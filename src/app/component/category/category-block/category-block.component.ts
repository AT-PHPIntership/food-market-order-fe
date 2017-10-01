import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PaginationService } from '../../../service/pagination.service';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../../service/api.service';
import { environment } from '../../../../environments/environment';
import {Title} from "@angular/platform-browser";

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
    categoryId: number;
    categoryActive: any;
    constructor(private pagination: PaginationService,
                private route: ActivatedRoute,
                private apiService: APIService,
                private title: Title) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
          this.categoryId = +params['id'];
          this.getListCategory();
        });
        let url;
        url = `${environment.hostname}/api/statistics/counts`;
        this.apiService.apiGet(url).subscribe(data => {
            let counts;
            counts = data.data;
            this.category_total = counts.categories ? counts.categories : 0;
            this.dailymenu_total = counts.daily_menus ? counts.daily_menus : 0;
            this.food_total = counts.foods ? counts.foods : 0;
            this.material_total = counts.materials ? counts.materials : 0;
            this.supplier_total = counts.suppliers ? counts.suppliers : 0;
        });
    }

    getListCategory() {
        let url;
        url = `${environment.hostname}/api/categories`;
        this.apiService.apiGet(url).subscribe(data => {
            this.categories = data.data;
            this.categoryActive = this.categories.find(item => item.id === this.categoryId);
            this.title.setTitle(this.categoryActive.name);
        });
    }
}
