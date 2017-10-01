import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { APIService } from '../../../service/api.service';
import { environment } from '../../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-home-dailymenu',
  templateUrl: './home-dailymenu.component.html',
  styleUrls: ['./home-dailymenu.component.css']
})
export class HomeDailymenuComponent implements OnInit {

  sub: any;
  data: any;
  constructor(private route: ActivatedRoute,
              private apiService: APIService) {
    this.data = [];
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let current_day, url;
      current_day = moment().format('Y-M-D');
      url = `${environment.hostname}/api/daily-menus/${current_day}`;
      this.apiService.apiGet(url).subscribe(data => {
        data.data.forEach(item => {
          let food;
          food = Object.assign({}, item);
          food.type = 'App\\Food';
          this.data.push(food);
        });
      });
    });
  }

}
