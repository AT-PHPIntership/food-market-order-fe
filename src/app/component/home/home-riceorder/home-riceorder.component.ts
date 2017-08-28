import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-home-riceorder',
  templateUrl: './home-riceorder.component.html'
})
export class HomeRiceorderComponent implements OnInit {
	foods: any;
  constructor(private apiService: APIService) { }

  ngOnInit() {
    let today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth()+1).toString();
    let yyyy = today.getFullYear().toString();
    let current_date = yyyy + '/' + mm + '/' + dd;
    console.log(current_date);
  	this.apiService.getApiDataByGetMethod('http://mysite.hub/api/daily-menus/show', current_date).subscribe(
  			(data: any) => {
          this.foods=data;
          console.log(this.foods);
        },
        err => {
          console.log("can't get food.");
        }
      	);
  }

}
