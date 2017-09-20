import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../service/api.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-top-trend',
  templateUrl: './top-trend.component.html',
  styleUrls: ['./top-trend.component.css']
})
export class TopTrendComponent implements OnInit {
  data: any;
  sub: any;
  constructor(private apiService: APIService) {
    this.data = [];
  }

  ngOnInit() {
    let url;
    url = environment.hostname + '/api/statistics/trends';
    this.apiService.apiGet(url).subscribe(data => {
      data.data.foods.forEach(item => {
        let food;
        food = Object.assign({}, item);
        food.type = 'App\\Food';
        this.data.push(food);
      });
      data.data.materials.forEach(item => {
        let material;
        material = Object.assign({}, item);
        material.type = 'App\\Material';
        this.data.push(material);
      });
    });
  }

}
