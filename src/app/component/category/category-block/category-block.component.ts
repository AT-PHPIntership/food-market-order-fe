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
    url = environment.hostname + '/api/counts';
    this.apiService.apiGet(url).subscribe(data => {
        this.category_total = data.Category ? data.Category : 0;
        this.dailymenu_total = data.DailyMenu ? data.DailyMenu : 0;
        this.food_total = data.Food ? data.Food : 0;
        this.material_total = data.Material ? data.Material : 0;
        this.supplier_total = data.Supplier ? data.Supplier : 0;
    });
    //get categories
    this.getListCategory();
    }

    getListCategory() {
        let url;
        url = environment.hostname + '/api/categories';
        this.apiService.apiGet(url).subscribe(data => {
            this.categories = data.data;
        });
    }
}
