import { Component, OnInit } from '@angular/core';
import { APIService } from '../../../services/api.service';

@Component({
  selector: 'app-home-riceorder',
  templateUrl: './home-riceorder.component.html',
  styleUrls: ['./home-riceorder.component.css']
})
export class HomeRiceorderComponent implements OnInit {
	foods: any;
  constructor(private getDataService: GetDataServiceService) { }

  ngOnInit() {
    let today = new Date();
    let dd = today.getDate().toString();
    let mm = (today.getMonth()+1).toString();
    let yyyy = today.getFullYear().toString();
    let current_date = yyyy + '/' + mm + '/' + dd;
  	this.getDataService.getApiDataByGetMethod('http://mysite.hub/api/daily-menus/show', 'date', current_date).subscribe(
  			(data: any) => {
          this.foods=data;
        },
        err => {
          console.log("can't get food.");
        }
      	);
  }

}
